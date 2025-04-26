const mongoose = require('mongoose');

const realEstateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Название обязательно'],
    trim: true,
    maxlength: [100, 'Название не может быть длиннее 100 символов']
  },
  description: {
    type: String,
    required: [true, 'Описание обязательно'],
    maxlength: [2000, 'Описание не может быть длиннее 2000 символов']
  },
  type: {
    type: String,
    required: [true, 'Тип недвижимости обязателен'],
    enum: ['apartment', 'house', 'room', 'office', 'commercial', 'other'],
    default: 'apartment'
  },
  price: {
    type: Number,
    required: [true, 'Цена обязательна']
  },
  priceUnit: {
    type: String,
    required: [true, 'Единица измерения цены обязательна'],
    enum: ['день', 'сутки', 'месяц', 'год'],
    default: 'сутки'
  },
  location: {
    city: {
      type: String,
      required: [true, 'Город обязателен']
    },
    address: {
      type: String,
      required: [true, 'Адрес обязателен']
    },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      }
    }
  },
  features: {
    bedrooms: {
      type: Number,
      default: 1
    },
    bathrooms: {
      type: Number,
      default: 1
    },
    area: {
      type: Number,
      required: [true, 'Площадь обязательна']
    },
    amenities: {
      type: [String],
      default: []
    }
  },
  images: {
    type: [String],
    default: ['default-property.jpg']
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  published: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Индекс для полнотекстового поиска
realEstateSchema.index({ 
  title: 'text', 
  description: 'text',
  'location.city': 'text', 
  'location.address': 'text' 
});

module.exports = mongoose.model('RealEstate', realEstateSchema); 