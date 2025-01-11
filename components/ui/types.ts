// components/ui/types.ts
import { TextProps } from 'react-native';

export interface CustomTextProps extends TextProps {
  variant?: 'default' | 'title' | 'subtitle' | 'caption';
  children: React.ReactNode;
  className?: string;
}