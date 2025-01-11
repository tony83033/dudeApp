// components/ui/Card.tsx
import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
}

export const Card: React.FC<CardProps> = ({ 
  className,
  children,
  variant = 'default',
  ...props 
}) => {
  return (
    <View
      className={cn(
        'bg-white rounded-lg',
        variant === 'default' && 'border border-gray-200',
        variant === 'outlined' && 'border-2 border-gray-300',
        variant === 'elevated' && 'shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
};