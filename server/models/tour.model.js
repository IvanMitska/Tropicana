const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Название экскурсии обязательно'],
    trim: true,
    maxlength: [100, 'Название не может быть длиннее 100 символов']
  },
  description: {
    type: String,
    required: [true, 'Описание экскурсии обязательно'],
    maxlength: [2000, 'Описание не может быть длиннее 2000 символов']
  },
  category: {
    type: String,
    required: [true, 'Категория экскурсии обязательна'],
    enum: ['city', 'nature', 'museum', 'historical', 'food', 'adventure', 'religious', 'private', 'group', 'other'],
  },
  duration: {
    type: Number,
    required: [true, 'Продолжительность экскурсии обязательна'],
    min: [0.5, 'Минимальная продолжительность экскурсии 0.5 часа']
  },
  languages: {
    type: [String],
    required: [true, 'Укажите хотя бы один язык проведения экскурсии'],
    enum: ['русский', 'английский', 'немецкий', 'французский', 'испанский', 'китайский', 'японский', 'арабский', 'другой']
  },
  route: {
    points: [{
      name: String,
      description: String,
      coordinates: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point'
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          index: '2dsphere'
        }
      },
      duration: Number, // время в минутах на этой точке
      order: Number     // порядок посещения
    }],
    totalDistance: Number, // расстояние в км
    type: {
      type: String,
      enum: ['walking', 'transport', 'mixed'],
      default: 'walking'
    }
  },
  included: {
    type: [String],
    default: []
  },
  notIncluded: {
    type: [String],
    default: []
  },
  images: {
    type: [String],
    default: ['default-tour.jpg']
  },
  video: {
    type: String,
    default: null
  },
  schedule: [{
    date: Date,
    startTime: String,
    endTime: String,
    availableSpots: Number,
    bookedSpots: {
      type: Number,
      default: 0
    },
    priceModifier: {
      type: Number,
      default: 0
    }, // модификатор цены для конкретного слота (скидка или надбавка)
    status: {
      type: String,
      enum: ['available', 'fullyBooked', 'cancelled'],
      default: 'available'
    }
  }],
  pricing: {
    basePrice: {
      type: Number,
      required: [true, 'Базовая цена экскурсии обязательна']
    },
    currency: {
      type: String,
      default: 'RUB'
    },
    priceType: {
      type: String,
      enum: ['perPerson', 'perGroup'],
      default: 'perPerson'
    },
    discounts: {
      children: {
        type: Number,
        default: 0
      }, // процент скидки для детей
      students: {
        type: Number,
        default: 0
      }, // процент скидки для студентов
      seniors: {
        type: Number,
        default: 0
      }, // процент скидки для пожилых
      groups: {
        type: Number,
        default: 0
      }  // процент скидки для групп
    },
    minParticipants: {
      type: Number,
      default: 1
    },
    maxParticipants: {
      type: Number,
      default: 15
    }
  },
  guide: {
    name: {
      type: String,
      required: [true, 'Имя гида обязательно']
    },
    photo: {
      type: String,
      default: 'default-guide.jpg'
    },
    bio: String,
    languages: [String],
    experience: Number, // опыт в годах
    contacts: {
      phone: String,
      email: String,
      social: {
        instagram: String,
        facebook: String,
        telegram: String,
        whatsapp: String
      }
    }
  },
  location: {
    city: {
      type: String,
      required: [true, 'Город обязателен']
    },
    address: {
      type: String,
      required: [true, 'Адрес начала экскурсии обязателен']
    },
    meetingPoint: {
      description: String,
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
    }
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Рейтинг не может быть меньше 0'],
    max: [5, 'Рейтинг не может быть больше 5'],
    set: function(val) {
      return Math.round(val * 10) / 10; // округление до 1 десятичного знака
    }
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  tags: {
    type: [String],
    default: []
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  published: {
    type: Boolean,
    default: true
  },
  popularity: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Индекс для полнотекстового поиска
tourSchema.index({ 
  title: 'text', 
  description: 'text',
  'location.city': 'text',
  tags: 'text',
  category: 'text'
});

// Обновление даты при изменении
tourSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Виртуальное поле для проверки, доступны ли слоты
tourSchema.virtual('hasAvailableSlots').get(function() {
  if (!this.schedule || this.schedule.length === 0) return false;
  
  const today = new Date();
  return this.schedule.some(slot => 
    new Date(slot.date) >= today && 
    slot.status === 'available' && 
    slot.availableSpots > slot.bookedSpots
  );
});

module.exports = mongoose.model('Tour', tourSchema); 