const Tour = require('../models/tour.model');

/**
 * @desc    Получить все экскурсии с фильтрацией
 * @route   GET /api/tours
 * @access  Public
 */
exports.getTours = async (req, res, next) => {
  try {
    // Создание объекта запроса
    let query = { published: true };
    
    // Копирование req.query
    const reqQuery = { ...req.query };
    
    // Поля для исключения из фильтрации
    const removeFields = ['select', 'sort', 'page', 'limit'];
    
    // Удаление полей
    removeFields.forEach(param => delete reqQuery[param]);
    
    // Создание строки запроса
    let queryStr = JSON.stringify(reqQuery);
    
    // Создание операторов MongoDB ($gt, $gte и т.д.)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    // Поиск по типу экскурсии
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Поиск по городу
    if (req.query.city) {
      query['location.city'] = { $regex: req.query.city, $options: 'i' };
    }
    
    // Поиск по языкам
    if (req.query.language) {
      query.languages = { $in: [req.query.language] };
    }
    
    // Поиск по длительности
    if (req.query.minDuration || req.query.maxDuration) {
      query.duration = {};
      
      if (req.query.minDuration) {
        query.duration.$gte = Number(req.query.minDuration);
      }
      
      if (req.query.maxDuration) {
        query.duration.$lte = Number(req.query.maxDuration);
      }
    }
    
    // Поиск по цене
    if (req.query.minPrice || req.query.maxPrice) {
      query['pricing.basePrice'] = {};
      
      if (req.query.minPrice) {
        query['pricing.basePrice'].$gte = Number(req.query.minPrice);
      }
      
      if (req.query.maxPrice) {
        query['pricing.basePrice'].$lte = Number(req.query.maxPrice);
      }
    }
    
    // Поиск по тегам
    if (req.query.tags) {
      const tags = req.query.tags.split(',');
      query.tags = { $in: tags };
    }
    
    // Поиск по запросу
    if (req.query.q) {
      query.$text = { $search: req.query.q };
    }
    
    // Базовый поиск
    let toursQuery = Tour.find(query);
    
    // Выбор полей
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      toursQuery = toursQuery.select(fields);
    }
    
    // Сортировка
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      toursQuery = toursQuery.sort(sortBy);
    } else {
      toursQuery = toursQuery.sort('-popularity');
    }
    
    // Пагинация
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Tour.countDocuments(query);
    
    toursQuery = toursQuery.skip(startIndex).limit(limit);
    
    // Выполнение запроса
    const tours = await toursQuery;
    
    // Результат пагинации
    const pagination = {};
    
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
    
    res.status(200).json({
      success: true,
      count: tours.length,
      pagination,
      data: tours
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Получить одну экскурсию
 * @route   GET /api/tours/:id
 * @access  Public
 */
exports.getTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);
    
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Экскурсия не найдена'
      });
    }
    
    res.status(200).json({
      success: true,
      data: tour
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Создать новую экскурсию
 * @route   POST /api/tours
 * @access  Private
 */
exports.createTour = async (req, res, next) => {
  try {
    // Добавление пользователя как гида
    if (req.user) {
      req.body.guide = {
        name: req.user.name,
        contacts: {
          email: req.user.email
        }
      };
    }
    
    const tour = await Tour.create(req.body);
    
    res.status(201).json({
      success: true,
      data: tour
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Обновить экскурсию
 * @route   PUT /api/tours/:id
 * @access  Private
 */
exports.updateTour = async (req, res, next) => {
  try {
    let tour = await Tour.findById(req.params.id);
    
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Экскурсия не найдена'
      });
    }
    
    // Проверка прав (если это гид)
    if (req.user && tour.guide.contacts.email !== req.user.email && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'У вас нет прав для обновления этой экскурсии'
      });
    }
    
    tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: tour
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Удалить экскурсию
 * @route   DELETE /api/tours/:id
 * @access  Private
 */
exports.deleteTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);
    
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Экскурсия не найдена'
      });
    }
    
    // Проверка прав
    if (req.user && tour.guide.contacts.email !== req.user.email && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'У вас нет прав для удаления этой экскурсии'
      });
    }
    
    await tour.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Получить категории экскурсий
 * @route   GET /api/tours/categories
 * @access  Public
 */
exports.getTourCategories = async (req, res, next) => {
  try {
    const categories = await Tour.aggregate([
      { $match: { published: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Получить популярные экскурсии
 * @route   GET /api/tours/featured
 * @access  Public
 */
exports.getFeaturedTours = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 6;
    
    const tours = await Tour.find({ published: true })
      .sort({ popularity: -1, rating: -1 })
      .limit(limit);
    
    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Проверить доступность экскурсии по датам
 * @route   GET /api/tours/availability/:id
 * @access  Public
 */
exports.checkTourAvailability = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Укажите начальную и конечную даты'
      });
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Неверный формат даты'
      });
    }
    
    const tour = await Tour.findById(req.params.id);
    
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Экскурсия не найдена'
      });
    }
    
    // Фильтруем слоты, которые попадают в диапазон дат
    const availableSlots = tour.schedule.filter(slot => {
      const slotDate = new Date(slot.date);
      return slotDate >= start && slotDate <= end && 
             slot.status === 'available' && 
             slot.availableSpots > slot.bookedSpots;
    });
    
    res.status(200).json({
      success: true,
      count: availableSlots.length,
      data: availableSlots
    });
  } catch (error) {
    next(error);
  }
}; 