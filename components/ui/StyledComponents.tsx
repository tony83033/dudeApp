// types/components.ts
import { 
    ViewProps, 
    ImageProps, 
    TouchableOpacityProps, 
    TextInputProps, 
    ScrollViewProps 
  } from 'react-native';
  
  export interface WithClassName {
    className?: string;
  }
  
  export type CustomViewProps = ViewProps & WithClassName;
  export type CustomTouchableOpacityProps = TouchableOpacityProps & WithClassName;
  export type CustomImageProps = ImageProps & WithClassName;
  export type CustomTextInputProps = TextInputProps & WithClassName;
  export type CustomScrollViewProps = ScrollViewProps & WithClassName;