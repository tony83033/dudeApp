// data/items.ts
import { Item } from '../types';

export const items: Item[] = [
    {
        id: '1',
        name: 'Premium Sugar',
        description: 'High-quality refined sugar perfect for all your sweetening needs.',
        basePrice: 51,
        baseMrp: 60,
        weight: '1 kg',
        discount: '15% OFF',
        image: { uri: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80' },
        categories: ['grocery', 'baking'],
        isPopular: true,
        isBestSeller: true
    },
    {
        id: '2',
        name: 'Whole Wheat Atta',
        description: 'Premium quality whole wheat flour perfect for making soft rotis and parathas.',
        basePrice: 371,
        baseMrp: 458,
        weight: '10 kg',
        discount: '20% OFF',
        image: { uri: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80' },
        categories: ['grocery', 'baking'],
        isBestSeller: true,
        isSeasonSpecial: true
    },
    // ... rest of your items with the updated structure
];

// Helper functions
export const getPopularItems = (): Item[] => {
    return items.filter(item => item.isPopular);
};

export const getBestSellers = (): Item[] => {
    return items.filter(item => item.isBestSeller);
};

export const getSeasonalItems = (): Item[] => {
    return items.filter(item => item.isSeasonSpecial);
};

export const getItemsByCategory = (categoryId: string): Item[] => {
    return items.filter(item => item.categories.includes(categoryId));
};