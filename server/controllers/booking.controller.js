const Booking = require('../models/booking.model');
const Payment = require('../models/payment.model');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { sendEmail } = require('../utils/email');

/**
 * @desc    Проверка доступности объекта на указанные даты
 * @route   POST /api/bookings/check-availability
 * @access  Public
 */
exports.checkAvailability = async (req, res) => {
  try {
    const { itemType, itemId, startDate, endDate } = req.body;

    if (!itemType || !itemId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Не указаны все необходимые параметры'
      });
    }

    // Проверка существующих бронирований на эти даты
    const overlappingBookings = await Booking.find({
      itemType,
      itemId,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        // Начало нового бронирования попадает в существующее
        { startDate: { $lte: new Date(startDate) }, endDate: { $gte: new Date(startDate) } },
        // Конец нового бронирования попадает в существующее
        { startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(endDate) } },
        // Новое бронирование полностью покрывает существующее
        { startDate: { $gte: new Date(startDate) }, endDate: { $lte: new Date(endDate) } }
      ]
    });

    const isAvailable = overlappingBookings.length === 0;

    return res.status(200).json({
      success: true,
      isAvailable,
      overlappingDates: isAvailable ? [] : overlappingBookings.map(booking => ({
        startDate: booking.startDate,
        endDate: booking.endDate
      }))
    });
  } catch (error) {
    console.error('Ошибка при проверке доступности:', error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка сервера при проверке доступности'
    });
  }
};

/**
 * @desc    Расчет стоимости бронирования
 * @route   POST /api/bookings/calculate-price
 * @access  Public
 */
exports.calculatePrice = async (req, res) => {
  try {
    const { itemType, itemId, startDate, endDate, options, guestCount } = req.body;

    if (!itemType || !itemId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Не указаны все необходимые параметры'
      });
    }

    // Загрузка модели в зависимости от типа бронируемого объекта
    let Model;
    switch (itemType) {
      case 'real-estate':
        Model = require('../models/real-estate.model');
        break;
      case 'transport':
        Model = require('../models/transport.model');
        break;
      case 'tour':
        Model = require('../models/tour.model');
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Неверный тип объекта'
        });
    }

    // Получение объекта из БД
    const item = await Model.findById(itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Объект не найден'
      });
    }

    // Расчет базовой стоимости
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    
    let basePrice = item.price;
    if (itemType === 'real-estate' || itemType === 'transport') {
      basePrice *= days;
    }

    // Учет количества гостей (для туров или аренды недвижимости)
    if ((itemType === 'tour' || itemType === 'real-estate') && guestCount > 1) {
      const extraGuestPrice = item.extraGuestPrice || 0;
      basePrice += (guestCount - 1) * extraGuestPrice;
    }

    // Расчет стоимости дополнительных опций
    let optionsPrice = 0;
    const calculatedOptions = [];

    if (options && options.length > 0) {
      options.forEach(optionId => {
        const selectedOption = item.options && item.options.find(opt => 
          opt._id.toString() === optionId || opt.id === optionId
        );
        
        if (selectedOption) {
          // Для опций с ценой за день
          let optionPrice = selectedOption.price;
          if (selectedOption.priceType === 'per_day') {
            optionPrice *= days;
          }
          
          optionsPrice += optionPrice;
          calculatedOptions.push({
            name: selectedOption.name,
            price: optionPrice
          });
        }
      });
    }

    // Расчет налогов и итоговой стоимости
    const taxRate = 0.2; // 20% налог (можно настроить в зависимости от типа)
    const taxAmount = (basePrice + optionsPrice) * taxRate;
    
    const totalPrice = basePrice + optionsPrice + taxAmount;

    return res.status(200).json({
      success: true,
      price: {
        basePrice,
        optionsPrice,
        taxAmount,
        totalPrice,
        currency: 'RUB',
        daysCount: days
      },
      calculatedOptions
    });
  } catch (error) {
    console.error('Ошибка при расчете стоимости:', error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка сервера при расчете стоимости'
    });
  }
};

/**
 * @desc    Создание бронирования
 * @route   POST /api/bookings
 * @access  Private/Public
 */
exports.createBooking = async (req, res) => {
  // Используем транзакцию MongoDB
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let {
      itemType,
      itemId,
      startDate,
      endDate,
      guestCount,
      options,
      contactInfo,
      notes
    } = req.body;

    if (!itemType || !itemId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Не указаны все необходимые параметры'
      });
    }

    // Сначала проверяем доступность
    const overlappingBookings = await Booking.find({
      itemType,
      itemId,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        { startDate: { $lte: new Date(startDate) }, endDate: { $gte: new Date(startDate) } },
        { startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(endDate) } },
        { startDate: { $gte: new Date(startDate) }, endDate: { $lte: new Date(endDate) } }
      ]
    });

    if (overlappingBookings.length > 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'Объект недоступен на выбранные даты'
      });
    }

    // Расчет цены 
    const priceCalculationResponse = await this.calculatePrice({
      body: {
        itemType,
        itemId,
        startDate,
        endDate,
        options,
        guestCount
      }
    }, { 
      json: (data) => data,
      status: () => ({ json: (data) => data })
    });

    if (!priceCalculationResponse.success) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json(priceCalculationResponse);
    }

    const priceData = priceCalculationResponse.price;
    const calculatedOptions = priceCalculationResponse.calculatedOptions.map(opt => ({
      name: opt.name,
      price: opt.price
    }));

    // Создаем новое бронирование
    const booking = new Booking({
      itemType,
      itemId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      guestCount: guestCount || 1,
      options: calculatedOptions,
      notes,
      price: {
        basePrice: priceData.basePrice,
        optionsPrice: priceData.optionsPrice,
        taxAmount: priceData.taxAmount,
        totalPrice: priceData.totalPrice,
        currency: priceData.currency || 'RUB'
      },
      status: 'draft',
      paymentStatus: 'pending'
    });

    // Если пользователь авторизован, связываем бронирование с аккаунтом
    if (req.user) {
      booking.user = req.user._id;
    } else {
      // Для неавторизованных пользователей сохраняем контактную информацию
      if (!contactInfo || !contactInfo.email || !contactInfo.name) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: 'Необходимо указать контактные данные для неавторизованных пользователей'
        });
      }
      booking.contactInfo = contactInfo;
    }

    // Сохраняем бронирование
    await booking.save({ session });

    // Отправляем email-уведомление о создании бронирования
    const emailTo = req.user ? req.user.email : booking.contactInfo.email;
    try {
      await sendEmail({
        to: emailTo,
        subject: `Бронирование #${booking.bookingNumber} создано`,
        html: `
          <h1>Ваше бронирование #${booking.bookingNumber} создано</h1>
          <p>Даты: ${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()}</p>
          <p>Статус: ${booking.status}</p>
          <p>Итоговая стоимость: ${booking.price.totalPrice} ${booking.price.currency}</p>
          <p>Для завершения бронирования необходимо произвести оплату.</p>
          <a href="${process.env.FRONTEND_URL}/bookings/${booking._id}/payment">Перейти к оплате</a>
        `
      });
    } catch (emailError) {
      console.error('Ошибка отправки email:', emailError);
      // Не прерываем создание бронирования, если email не отправлен
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      booking
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Ошибка при создании бронирования:', error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка сервера при создании бронирования'
    });
  }
};

/**
 * @desc    Создание платежной сессии
 * @route   POST /api/bookings/:id/payment
 * @access  Private/Public
 */
exports.createPaymentSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentMethod } = req.body;

    // Получаем бронирование
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Бронирование не найдено'
      });
    }

    // Проверяем, что бронирование принадлежит текущему пользователю или связано с email неавторизованного пользователя
    if (
      req.user && booking.user && booking.user.toString() !== req.user._id.toString() || 
      (!req.user && !booking.contactInfo)
    ) {
      return res.status(403).json({
        success: false,
        message: 'Доступ запрещен'
      });
    }

    // Проверяем, что бронирование не оплачено
    if (booking.paymentStatus === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Бронирование уже оплачено'
      });
    }

    // Получаем информацию о забронированном объекте
    let itemModel;
    let itemTitle;
    
    switch (booking.itemType) {
      case 'real-estate':
        itemModel = require('../models/real-estate.model');
        break;
      case 'transport':
        itemModel = require('../models/transport.model');
        break;
      case 'tour':
        itemModel = require('../models/tour.model');
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Неверный тип объекта'
        });
    }

    const item = await itemModel.findById(booking.itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Объект бронирования не найден'
      });
    }

    itemTitle = item.title || item.name || 'Бронирование';

    // Создание платежа в БД
    const payment = new Payment({
      booking: booking._id,
      user: booking.user || null,
      method: paymentMethod,
      amount: booking.price.totalPrice,
      currency: booking.price.currency,
      status: 'pending',
      description: `Оплата бронирования #${booking.bookingNumber} (${itemTitle})`,
      paymentProviderData: {
        provider: 'stripe'
      }
    });

    await payment.save();

    // Добавляем платеж в список платежей бронирования
    booking.payments.push(payment._id);
    await booking.save();

    // Создаем сессию Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: booking.price.currency.toLowerCase(),
            product_data: {
              name: `Бронирование ${itemTitle}`,
              description: `#${booking.bookingNumber} (${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()})`,
            },
            unit_amount: Math.round(booking.price.totalPrice * 100), // Stripe использует центы/копейки
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/bookings/${booking._id}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/bookings/${booking._id}/payment`,
      client_reference_id: booking._id.toString(),
      metadata: {
        booking_id: booking._id.toString(),
        payment_id: payment._id.toString()
      }
    });

    // Обновляем платеж данными сессии Stripe
    payment.paymentProviderData.sessionId = session.id;
    await payment.save();

    return res.status(200).json({
      success: true,
      sessionId: session.id,
      paymentId: payment._id,
      url: session.url
    });
  } catch (error) {
    console.error('Ошибка при создании платежной сессии:', error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка сервера при создании платежной сессии'
    });
  }
};

/**
 * @desc    Подтверждение платежа
 * @route   GET /api/bookings/verify-payment/:sessionId
 * @access  Private/Public
 */
exports.verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Получаем данные о сессии из Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Платеж не подтвержден'
      });
    }

    // Находим платеж по ID сессии
    const payment = await Payment.findOne({
      'paymentProviderData.sessionId': sessionId
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Платеж не найден'
      });
    }

    // Если платеж уже обработан, просто возвращаем информацию
    if (payment.status === 'completed') {
      return res.status(200).json({
        success: true,
        payment,
        message: 'Платеж уже подтвержден'
      });
    }

    // Обновляем статус платежа
    payment.status = 'completed';
    payment.transactionId = session.payment_intent;
    
    // Обновляем данные о платежной системе
    if (session.payment_intent) {
      payment.paymentProviderData.intentId = session.payment_intent;
    }

    // Получаем информацию о бронировании
    const booking = await Booking.findById(payment.booking);
    
    if (booking) {
      // Обновляем статус бронирования
      booking.paymentStatus = 'completed';
      booking.status = 'confirmed';
      await booking.save();
      
      // Отправляем подтверждение о бронировании на email
      try {
        const emailTo = booking.user ? 
          (await require('../models/user.model').findById(booking.user)).email : 
          booking.contactInfo.email;
          
        await sendEmail({
          to: emailTo,
          subject: `Подтверждение бронирования #${booking.bookingNumber}`,
          html: `
            <h1>Ваше бронирование #${booking.bookingNumber} подтверждено</h1>
            <p>Оплата успешно произведена.</p>
            <p>Даты: ${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()}</p>
            <p>Итоговая стоимость: ${booking.price.totalPrice} ${booking.price.currency}</p>
            <p>Спасибо за использование нашего сервиса!</p>
            <a href="${process.env.FRONTEND_URL}/bookings/${booking._id}">Посмотреть детали бронирования</a>
          `
        });
      } catch (emailError) {
        console.error('Ошибка отправки email:', emailError);
        // Не прерываем подтверждение платежа, если email не отправлен
      }
    }

    await payment.save();

    return res.status(200).json({
      success: true,
      payment,
      booking,
      message: 'Платеж успешно подтвержден'
    });
  } catch (error) {
    console.error('Ошибка при проверке платежа:', error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка сервера при проверке платежа'
    });
  }
};

/**
 * @desc    Получение информации о бронировании
 * @route   GET /api/bookings/:id
 * @access  Private/Public
 */
exports.getBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id)
      .populate('payments');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Бронирование не найдено'
      });
    }

    // Проверяем доступ (для авторизованных пользователей или по email)
    if (
      req.user && booking.user && booking.user.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin' &&
      (!booking.contactInfo || !req.user.email || booking.contactInfo.email !== req.user.email)
    ) {
      return res.status(403).json({
        success: false,
        message: 'Доступ запрещен'
      });
    }

    return res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Ошибка при получении бронирования:', error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении бронирования'
    });
  }
};

/**
 * @desc    Получение списка бронирований пользователя
 * @route   GET /api/bookings
 * @access  Private
 */
exports.getUserBookings = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Требуется авторизация'
      });
    }

    const bookings = await Booking.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error('Ошибка при получении списка бронирований:', error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении списка бронирований'
    });
  }
};

/**
 * @desc    Отмена бронирования
 * @route   PUT /api/bookings/:id/cancel
 * @access  Private/Public
 */
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Бронирование не найдено'
      });
    }

    // Проверяем доступ
    if (
      req.user && booking.user && booking.user.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin' &&
      (!booking.contactInfo || !req.user.email || booking.contactInfo.email !== req.user.email)
    ) {
      return res.status(403).json({
        success: false,
        message: 'Доступ запрещен'
      });
    }

    // Проверяем возможность отмены
    if (booking.status === 'canceled') {
      return res.status(400).json({
        success: false,
        message: 'Бронирование уже отменено'
      });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Невозможно отменить завершенное бронирование'
      });
    }

    // Проверяем возможность возврата средств
    if (booking.paymentStatus === 'completed') {
      // Находим связанный платеж
      const payment = await Payment.findOne({
        booking: booking._id,
        status: 'completed'
      });

      if (payment && payment.paymentProviderData.provider === 'stripe' && payment.paymentProviderData.intentId) {
        try {
          // Создаем возврат средств в Stripe
          const refund = await stripe.refunds.create({
            payment_intent: payment.paymentProviderData.intentId,
            reason: 'requested_by_customer'
          });

          // Обновляем статус платежа
          payment.status = 'refunded';
          payment.refundedAt = new Date();
          await payment.save();
        } catch (refundError) {
          console.error('Ошибка при возврате средств:', refundError);
          return res.status(500).json({
            success: false,
            message: 'Ошибка при возврате средств. Обратитесь в службу поддержки.'
          });
        }
      }

      booking.paymentStatus = 'refunded';
    }

    booking.status = 'canceled';
    await booking.save();

    // Отправляем уведомление об отмене бронирования
    try {
      const emailTo = booking.user ? 
        (await require('../models/user.model').findById(booking.user)).email : 
        booking.contactInfo.email;
        
      await sendEmail({
        to: emailTo,
        subject: `Бронирование #${booking.bookingNumber} отменено`,
        html: `
          <h1>Ваше бронирование #${booking.bookingNumber} отменено</h1>
          <p>Даты: ${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()}</p>
          <p>Если вы производили оплату, средства будут возвращены в соответствии с правилами платежной системы.</p>
        `
      });
    } catch (emailError) {
      console.error('Ошибка отправки email:', emailError);
      // Не прерываем отмену бронирования, если email не отправлен
    }

    return res.status(200).json({
      success: true,
      message: 'Бронирование успешно отменено',
      booking
    });
  } catch (error) {
    console.error('Ошибка при отмене бронирования:', error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка сервера при отмене бронирования'
    });
  }
};

/**
 * @desc    Сохранение черновика бронирования
 * @route   POST /api/bookings/draft
 * @access  Public
 */
exports.saveDraft = async (req, res) => {
  try {
    const {
      itemType,
      itemId,
      startDate,
      endDate,
      guestCount,
      options,
      contactInfo
    } = req.body;

    if (!itemType || !itemId) {
      return res.status(400).json({
        success: false,
        message: 'Не указаны обязательные параметры: тип и ID объекта'
      });
    }

    // Создаем черновик бронирования
    let draft = {
      itemType,
      itemId,
      status: 'draft',
      paymentStatus: 'pending'
    };

    // Добавляем опциональные поля, если они предоставлены
    if (startDate) draft.startDate = new Date(startDate);
    if (endDate) draft.endDate = new Date(endDate);
    if (guestCount) draft.guestCount = guestCount;
    if (options) draft.options = options;
    if (contactInfo) draft.contactInfo = contactInfo;

    // Если пользователь авторизован, связываем черновик с аккаунтом
    if (req.user) {
      draft.user = req.user._id;
    }

    // Сохраняем черновик в БД
    const booking = new Booking(draft);
    await booking.save();

    return res.status(201).json({
      success: true,
      message: 'Черновик бронирования сохранен',
      booking
    });
  } catch (error) {
    console.error('Ошибка при сохранении черновика:', error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка сервера при сохранении черновика'
    });
  }
}; 