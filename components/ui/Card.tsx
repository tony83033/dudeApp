// components/ui/Card.tsx
import React from 'react';
import { View, ViewProps } from 'react-native';

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
  // Determine card styles based on variant
  const cardVariantClasses = {
    default: 'border border-gray-200',
    outlined: 'border-2 border-gray-300',
    elevated: 'shadow-md',
  };

  return (
    <View
      className={`
        bg-white rounded-lg
        ${cardVariantClasses[variant]}
        ${className || ''}
      `}
      {...props}
    >
      {children}
    </View>
  );
};