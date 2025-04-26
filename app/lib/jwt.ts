import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { SafeUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 дней в миллисекундах

export type JwtPayload = {
  userId: string;
  email: string;
  role: string;
  name: string;
};

export function signJwtToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyJwtToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
}

export function setAuthCookie(res: NextResponse, token: string): void {
  res.cookies.set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

export function removeAuthCookie(res: NextResponse): void {
  res.cookies.set({
    name: 'auth_token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
}

export function getAuthTokenFromRequest(req: NextRequest): string | undefined {
  const token = req.cookies.get('auth_token')?.value;
  return token;
}

export function getAuthTokenFromServerComponent(): string | undefined {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;
  return token;
}

export function createUserJwtPayload(user: SafeUser): JwtPayload {
  return {
    userId: user._id!.toString(),
    email: user.email,
    role: user.role,
    name: user.name,
  };
} 