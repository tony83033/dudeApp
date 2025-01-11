// components/ui/Button.tsx
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { Text } from './Text';
import { cn } from '../../lib/utils';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={cn(
        'rounded-lg items-center justify-center',
        variant === 'primary' && 'bg-green-500',
        variant === 'secondary' && 'bg-gray-100',
        variant === 'outline' && 'border border-green-500',
        size === 'sm' && 'px-3 py-2',
        size === 'md' && 'px-4 py-3',
        size === 'lg' && 'px-6 py-4',
        disabled && 'opacity-50',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#22C55E' : 'white'} />
      ) : (
        <Text
          className={cn(
            'font-medium',
            variant === 'primary' && 'text-white',
            variant === 'secondary' && 'text-gray-900',
            variant === 'outline' && 'text-green-500'
          )}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};