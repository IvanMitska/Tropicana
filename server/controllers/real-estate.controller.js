const RealEstate = require('../models/real-estate.model');

/**
 * @desc    Получить все объекты недвижимости с фильтрацией
 * @route   GET /api/real-estate
 * @access  Public
 */
exports.getRealEstates = async (req, res, next) => {
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
    
    // Поиск по типу недвижимости
    if (req.query.type) {
      query.type = req.query.type;
    }
    
    // Поиск по городу
    if (req.query.city) {
      query['location.city'] = { $regex: req.query.city, $options: 'i' };
    }
    
    // Поиск по цене
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      
      if (req.query.minPrice) {
        query.price.$gte = Number(req.query.minPrice);
      }
      
      if (req.query.maxPrice) {
        query.price.$lte = Number(req.query.maxPrice);
      }
    }
    
    // Поиск по параметрам
    if (req.query.bedrooms) {
      query['features.bedrooms'] = Number(req.query.bedrooms);
    }
    
    if (req.query.bathrooms) {
      query['features.bathrooms'] = Number(req.query.bathrooms);
    }
    
    if (req.query.minArea) {
      query['features.area'] = { $gte: Number(req.query.minArea) };
    }
    
    // Поиск по запросу
    if (req.query.q) {
      query.$text = { $search: req.query.q };
    }
    
    // Базовый поиск
    let propertiesQuery = RealEstate.find(query);
    
    // Выбор полей
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      propertiesQuery = propertiesQuery.select(fields);
    }
    
    // Сортировка
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      propertiesQuery = propertiesQuery.sort(sortBy);
    } else {
      propertiesQuery = propertiesQuery.sort('-createdAt');
    }
    
    // Пагинация
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await RealEstate.countDocuments(query);
    
    propertiesQuery = propertiesQuery.skip(startIndex).limit(limit);
    
    // Выполнение запроса
    const properties = await propertiesQuery.populate({
      path: 'owner',
      select: 'name email phone'
    });
    
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
      count: properties.length,
      pagination,
      data: properties
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Получить один объект недвижимости
 * @route   GET /api/real-estate/:id
 * @access  Public
 */
exports.getRealEstate = async (req, res, next) => {
  try {
    const property = await RealEstate.findById(req.params.id).populate({
      path: 'owner',
      select: 'name email phone'
    });
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Объект недвижимости не найден'
      });
    }
    
    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Создать новый объект недвижимости
 * @route   POST /api/real-estate
 * @access  Private
 */
exports.createRealEstate = async (req, res, next) => {
  try {
    // Добавление владельца
    req.body.owner = req.user.id;
    
    const property = await RealEstate.create(req.body);
    
    res.status(201).json({
      success: true,
      data: property
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Обновить объект недвижимости
 * @route   PUT /api/real-estate/:id
 * @access  Private
 */
exports.updateRealEstate = async (req, res, next) => {
  try {
    let property = await RealEstate.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Объект недвижимости не найден'
      });
    }
    
    // Проверка владельца
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'У вас нет прав для обновления этого объекта'
      });
    }
    
    property = await RealEstate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Удалить объект недвижимости
 * @route   DELETE /api/real-estate/:id
 * @access  Private
 */
exports.deleteRealEstate = async (req, res, next) => {
  try {
    const property = await RealEstate.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Объект недвижимости не найден'
      });
    }
    
    // Проверка владельца
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'У вас нет прав для удаления этого объекта'
      });
    }
    
    await property.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
}; 