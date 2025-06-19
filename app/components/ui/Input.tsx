'use client';

import React, { forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from "../../lib/utils";

const inputVariants = cva(
  'w-full rounded-md border bg-white px-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary',
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus:border-primary',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
      },
      size: {
        sm: 'h-8 text-xs',
        md: 'h-10',
        lg: 'h-12 text-base',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50 bg-gray-100',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-500" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, fullWidth = true, disabled, ...props }, ref) => {
    return (
      <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
        <textarea
          className={`w-full min-h-[100px] rounded-md border ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-primary'
          } ${
            disabled ? 'cursor-not-allowed opacity-50 bg-gray-100' : ''
          } bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
            className || ''
          }`}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea'; 