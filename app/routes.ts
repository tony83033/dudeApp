// app/routes.ts
export const ROUTES = {
    TABS: {
      HOME: '/(tabs)/home',
      CATEGORIES: '/(tabs)/categories',
      CART: '/(tabs)/cart',
      PROFILE: '/(tabs)/profile',
    },
    AUTH: {
      SIGN_IN: '/(auth)/sign-in',
      SIGN_UP: '/(auth)/sign-up',
    },
    CATEGORY: (id: string) => `/category/${id}`,
    PRODUCT: (id: string) => `/product/${id}`,
  };