// types/navigation.ts
export type RootStackParamList = {
    '(tabs)': undefined;
    '(auth)': undefined;
    'category/[id]': { id: string };
    'product/[id]': { id: string };
  };
  
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }