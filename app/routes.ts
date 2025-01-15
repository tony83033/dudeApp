// app/routes.ts
import { Link, router } from 'expo-router';
import { Route } from 'expo-router/build/types';

// Define specific param types
type CategoryParams = { id: string };
type ProductParams = { id: string };

// Define route segment types
type RouteSegment<T = undefined> = T extends undefined
  ? { pathname: Route }
  : { pathname: Route; params: T };

// Define base interfaces
interface ITabRoutes {
  HOME: Route;
  CATEGORIES: Route;
  CART: Route;
  PROFILE: Route;
}

interface IAuthRoutes {
  SIGN_IN: Route;
  SIGN_UP: Route;
}

interface IProfileRoutes {
  ORDERS: Route;
  EARNINGS: Route;
  REFERRAL: Route;
  ADDRESSES: Route;
  SUPPORT: Route;
  LANGUAGE: Route;
  TERMS: Route;
  PRIVACY: Route;
}

interface IFeatureRoutes {
  BEST_SELLERS: Route;
  DEALS: Route;
  COOKING_ESSENTIALS: Route;
  PACKAGED_FOOD: Route;
  BEVERAGES: Route;
}

interface IRoutes {
  TABS: ITabRoutes;
  AUTH: IAuthRoutes;
  PROFILE: IProfileRoutes;
  FEATURES: IFeatureRoutes;
  CATEGORY: (id: string) => RouteSegment<CategoryParams>;
  PRODUCT: (id: string) => RouteSegment<ProductParams>;
}

// Define the routes constant
export const ROUTES: IRoutes = {
  TABS: {
    HOME: '/(tabs)/home' as Route,
    CATEGORIES: '/(tabs)/categories' as Route,
    CART: '/(tabs)/cart' as Route,
    PROFILE: '/(tabs)/profile' as Route,
  },
  AUTH: {
    SIGN_IN: '/(auth)/sign-in' as Route,
    SIGN_UP: '/(auth)/sign-up' as Route,
  },
  PROFILE: {
    ORDERS: '/(profile)/orders' as Route,
    EARNINGS: '/(profile)/earnings' as Route,
    REFERRAL: '/(profile)/referral' as Route,
    ADDRESSES: '/(profile)/addresses' as Route,
    SUPPORT: '/(profile)/support' as Route,
    LANGUAGE: '/(profile)/language' as Route,
    TERMS: '/(profile)/terms' as Route,
    PRIVACY: '/(profile)/privacy' as Route,
  },
  FEATURES: {
    BEST_SELLERS: '/(features)/best-sellers' as Route,
    DEALS: '/(features)/deals' as Route,
    COOKING_ESSENTIALS: '/(features)/cooking-essentials' as Route,
    PACKAGED_FOOD: '/(features)/packaged-food' as Route,
    BEVERAGES: '/(features)/beverages' as Route,
  },
  CATEGORY: (id: string): RouteSegment<CategoryParams> => ({
    pathname: '/category/[id]' as Route,
    params: { id }
  }),
  PRODUCT: (id: string): RouteSegment<ProductParams> => ({
    pathname: '/product/[id]' as Route,
    params: { id }
  }),
};

// Navigation helper functions
export const navigate = {
  toTab: (route: keyof ITabRoutes) => {
    router.push(ROUTES.TABS[route]);
  },
  toAuth: (route: keyof IAuthRoutes) => {
    router.push(ROUTES.AUTH[route]);
  },
  toProfile: (route: keyof IProfileRoutes) => {
    router.push(ROUTES.PROFILE[route]);
  },
  toFeature: (route: keyof IFeatureRoutes) => {
    router.push(ROUTES.FEATURES[route]);
  },
  toCategory: (id: string) => {
    router.push({
      pathname: '/category/[id]',
      params: { id }
    });
  },
  toProduct: (id: string) => {
    router.push({
      pathname: '/product/[id]',
      params: { id }
    });
  },
};

// Helper function to check if a route is valid
export const isValidRoute = (route: Route): boolean => {
  const staticRoutes = [
    ...Object.values(ROUTES.TABS),
    ...Object.values(ROUTES.AUTH),
    ...Object.values(ROUTES.PROFILE),
    ...Object.values(ROUTES.FEATURES),
  ];
  return staticRoutes.includes(route);
};

const AppRoutes = {
  ROUTES,
  navigate,
  isValidRoute,
};

export default AppRoutes;

// Export type aliases
export type TabRoutes = ITabRoutes;
export type AuthRoutes = IAuthRoutes;
export type ProfileRoutes = IProfileRoutes;
export type FeatureRoutes = IFeatureRoutes;
export type Routes = IRoutes;

// Export additional types
export type {
  RouteSegment,
  CategoryParams,
  ProductParams,
};