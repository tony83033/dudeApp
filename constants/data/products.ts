// data/products.ts
import { Product } from '../types';
import { IMAGES } from '../constants/images';
  
  export const PRODUCTS: Product[] = [
    {
      id: 'sugar',
      name: 'Premium Sugar',
      description: 'High-quality refined sugar',
      basePrice: 51,
      baseMrp: 60,
      weight: '1 kg',
      discount: '15% OFF',
      image: IMAGES.sugar,
      category: 'groceries',
      isBestSeller: true,
    },
    {
      id: 'salt',
      name: 'Iodized Salt',
      description: 'Pure iodized salt',
      basePrice: 9,
      baseMrp: 12,
      weight: '1 kg',
      discount: '25% OFF',
      image: { uri: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=500&q=80" },
      category: 'groceries',
      isPopular: true,
    },
    {
      id: 'atta',
      name: "Savaria Shudh Whole Wheat Atta",
      description: 'Premium quality wheat flour',
      basePrice: 371,
      baseMrp: 458,
      weight: "10 kg",
      discount: "20% OFF",
      image: { uri: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80" },
      category: 'groceries',
      isBestSeller: true,
      isSeasonSpecial: true,
    },
    {
      id: 'rice',
      name: "Premium Basmati Rice",
      description: 'Long grain basmati rice',
      basePrice: 299,
      baseMrp: 399,
      weight: "5 kg",
      discount: "25% OFF",
      image: { uri: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80" },
      category: 'groceries',
      isBestSeller: true,
      isSeasonSpecial: true,
    },
    // Add more products...
  ];

  // Helper functions

export const getPopularProducts = () => PRODUCTS.filter(product => product.isPopular);
export const getSeasonSpecials = () => PRODUCTS.filter(product => product.isSeasonSpecial);
export const getProductsByCategory = (categoryId: string) => 
  PRODUCTS.filter(product => product.category === categoryId);


export const getBestSellers = (): Product[] => 
  PRODUCTS.filter(product => product.id === 'sugar' || product.id === 'atta');