import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IDocument {
  type: 'passport' | 'driverLicense' | 'other';
  documentNumber: string;
  issuedDate: Date;
  expiryDate?: Date;
  filename: string;
  verified: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  rejectionReason?: string;
  verifiedAt?: Date;
}

export interface IPaymentMethod {
  type: 'card' | 'paypal' | 'other';
  cardLast4?: string;
  cardBrand?: string;
  isDefault: boolean;
  expiryDate?: string;
}

export interface IPayment {
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  bookingId?: string;
  transactionId: string;
  date: Date;
  receiptUrl?: string;
}

export interface INotificationSettings {
  email: boolean;
  sms: boolean;
  pushNotifications: boolean;
  bookingReminders: boolean;
  promotionalOffers: boolean;
  accountActivity: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  phone?: string;
  avatar?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  documents?: IDocument[];
  paymentMethods?: IPaymentMethod[];
  payments?: IPayment[];
  favorites?: {
    properties: mongoose.Types.ObjectId[];
    vehicles: mongoose.Types.ObjectId[];
    tours: mongoose.Types.ObjectId[];
    excursions: mongoose.Types.ObjectId[];
  };
  notificationSettings?: INotificationSettings;
  securitySettings?: {
    twoFactorEnabled: boolean;
    activeDevices?: {
      deviceId: string;
      deviceName: string;
      lastActive: Date;
      ipAddress: string;
    }[];
  };
  loginHistory?: {
    date: Date;
    ipAddress: string;
    device: string;
    location?: string;
    successful: boolean;
  }[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export type SafeUser = Omit<Partial<IUser>, 'password'> & { _id?: mongoose.Types.ObjectId };

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Имя обязательно'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email обязателен'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Пожалуйста, укажите корректный email'],
    },
    password: {
      type: String,
      required: [true, 'Пароль обязателен'],
      minlength: [8, 'Пароль должен содержать минимум 8 символов'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    documents: [
      {
        type: {
          type: String,
          enum: ['passport', 'driverLicense', 'other'],
          required: true,
        },
        documentNumber: {
          type: String,
          required: true,
        },
        issuedDate: {
          type: Date,
          required: true,
        },
        expiryDate: Date,
        filename: {
          type: String,
          required: true,
        },
        verified: {
          type: Boolean,
          default: false,
        },
        verificationStatus: {
          type: String,
          enum: ['pending', 'verified', 'rejected'],
          default: 'pending',
        },
        rejectionReason: String,
        verifiedAt: Date,
      },
    ],
    paymentMethods: [
      {
        type: {
          type: String,
          enum: ['card', 'paypal', 'other'],
          required: true,
        },
        cardLast4: String,
        cardBrand: String,
        isDefault: {
          type: Boolean,
          default: false,
        },
        expiryDate: String,
      },
    ],
    payments: [
      {
        amount: {
          type: Number,
          required: true,
        },
        currency: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ['pending', 'completed', 'failed', 'refunded'],
          required: true,
        },
        paymentMethod: {
          type: String,
          required: true,
        },
        bookingId: String,
        transactionId: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        receiptUrl: String,
      },
    ],
    favorites: {
      properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
      vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }],
      tours: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tour' }],
      excursions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Excursion' }],
    },
    notificationSettings: {
      email: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: false,
      },
      pushNotifications: {
        type: Boolean,
        default: true,
      },
      bookingReminders: {
        type: Boolean,
        default: true,
      },
      promotionalOffers: {
        type: Boolean,
        default: false,
      },
      accountActivity: {
        type: Boolean,
        default: true,
      },
    },
    securitySettings: {
      twoFactorEnabled: {
        type: Boolean,
        default: false,
      },
      activeDevices: [
        {
          deviceId: String,
          deviceName: String,
          lastActive: Date,
          ipAddress: String,
        },
      ],
    },
    loginHistory: [
      {
        date: Date,
        ipAddress: String,
        device: String,
        location: String,
        successful: Boolean,
      },
    ],
  },
  { timestamps: true }
);

// Метод для сравнения паролей
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Проверка наличия модели перед созданием новой
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User; 