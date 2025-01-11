// components/ui/Text.tsx
import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

interface CustomTextProps extends TextProps {
  variant?: 'default' | 'title' | 'subtitle' | 'caption' | 'heading1' | 'heading2' | 'body';
  children: React.ReactNode;
  className?: string;
}

// Define text styles based on variant
const textVariants = {
  default: 'text-gray-900',
  title: 'text-lg font-bold',
  subtitle: 'text-sm text-gray-600',
  caption: 'text-xs text-gray-500',
  heading1: 'text-2xl font-bold text-gray-900',
  heading2: 'text-xl font-semibold text-gray-900',
  body: 'text-base text-gray-700',
};

export const Text: React.FC<CustomTextProps> = ({ 
  variant = 'default',
  className,
  children,
  ...props 
}) => {
  return (
    <RNText
      className={`${textVariants[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </RNText>
  );
};

Text.displayName = 'Text';