import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from piling up during
 * development, exceeding database connection limits.
 */
// eslint-disable-next-line no-var
var cached = global.mongooseConnection;

if (!cached) {
  // eslint-disable-next-line no-var
  cached = global.mongooseConnection = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('MongoDB: Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // useNewUrlParser: true, // Эти опции устарели и могут вызывать ошибки с новыми версиями Mongoose
      // useUnifiedTopology: true,
    };
    console.log('MongoDB: Creating new connection promise');
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      console.log('MongoDB: Connection successful');
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB: Connection error:', e);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;

// Экспортируем функцию для совместимости
export const connectToDatabase = dbConnect; 