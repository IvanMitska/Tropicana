'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from "@/app/lib/utils";

const cardVariants = cva(
  'bg-white rounded-lg overflow-hidden transition-shadow hover:shadow-md',
  {
    variants: {
      variant: {
        default: 'shadow-sm border border-gray-200',
        elevated: 'shadow-md',
        outline: 'border border-gray-200',
        plain: '',
      },
      hover: {
        true: 'hover:scale-105 transition-transform duration-300',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      hover: false,
    },
  }
);

export interface CardProps extends VariantProps<typeof cardVariants> {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ className, variant, hover, children, href, ...props }, ref) => {
  const cardClasses = cn(cardVariants({ variant, hover, className }));
  
  const cardContent = (
    <div
      ref={ref}
      className={cardClasses}
      {...props}
      data-hover={hover ? "true" : undefined}
    >
      {children}
    </div>
  );

  return href ? (
    <Link href={href} className="block">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
});

Card.displayName = "Card";

export interface CardMediaProps {
  src: string;
  alt: string;
  height?: number;
  aspectRatio?: 'square' | 'video' | '4/3' | '16/9';
  fill?: boolean;
  objectFit?: 'cover' | 'contain';
  className?: string;
}

export const CardMedia = ({
  src,
  alt,
  height = 200,
  fill = false,
  aspectRatio = '16/9',
  objectFit = 'cover',
  className,
}: CardMediaProps) => {
  let aspectRatioClass = '';
  
  if (!fill) {
    switch (aspectRatio) {
      case 'square':
        aspectRatioClass = 'aspect-square';
        break;
      case 'video':
        aspectRatioClass = 'aspect-video';
        break;
      case '4/3':
        aspectRatioClass = 'aspect-[4/3]';
        break;
      case '16/9':
        aspectRatioClass = 'aspect-[16/9]';
        break;
    }
  }

  return (
    <div className={`relative ${fill ? '' : aspectRatioClass} ${className || ''}`} style={fill ? {} : { height }}>
      <Image
        src={src}
        alt={alt}
        fill={true}
        style={{ objectFit }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="transition-opacity duration-300"
      />
    </div>
  );
};

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

// Карточка объекта каталога (например, недвижимости)
export interface PropertyCardProps {
  id: string | number;
  title: string;
  description: string;
  price: number;
  priceUnit: string;
  location: string;
  imageSrc: string;
  features?: {
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    [key: string]: any;
  };
  href: string;
  className?: string;
}

export const PropertyCard = ({
  id,
  title,
  description,
  price,
  priceUnit,
  location,
  imageSrc,
  features,
  href,
  className,
}: PropertyCardProps) => {
  return (
    <Card variant="default" hover={true} href={href} className={className}>
      <CardMedia src={imageSrc} alt={title} aspectRatio="4/3" />
      <CardContent>
        <div className="flex justify-between items-start mb-2">
          <CardTitle>{title}</CardTitle>
          <div className="font-bold text-lg text-primary">
            {price.toLocaleString()} <span className="text-sm">{priceUnit}</span>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
        <div className="text-gray-500 mb-4">{location}</div>
        {features && (
          <div className="flex justify-between text-gray-600 mb-4">
            {features.bedrooms !== undefined && (
              <div>
                <span className="font-medium">{features.bedrooms}</span> спален
              </div>
            )}
            {features.bathrooms !== undefined && (
              <div>
                <span className="font-medium">{features.bathrooms}</span> ванных
              </div>
            )}
            {features.area !== undefined && (
              <div>
                <span className="font-medium">{features.area}</span> м²
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 