// components/ui/Input.tsx
import React from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  containerClassName,
  className,
  ...props
}) => {
  return (
    <View className={`w-full ${containerClassName || ''}`}>
      {label && (
        <Text className="text-sm font-medium mb-1 text-gray-700">
          {label}
        </Text>
      )}
      <TextInput
        className={`
          w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200
          ${error ? 'border-red-500' : ''}
          ${className || ''}
        `}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;