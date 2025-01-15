// Constants
export const IMAGES = {
  masala: { uri: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80" },
  sugar: { uri: "https://images.unsplash.com/photo-1622484211148-c6b9d8dba7bb?w=500&q=80" },
  salt: { uri: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=500&q=80" },
  atta: { uri: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80" },
  rice: { uri: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80" },
  oil: { uri: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80" },
  fruits: { uri: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&q=80" },
};

export const QUICK_LINKS = [
  { icon: 'basket' as const, title: 'Top Deals' },
  { icon: 'restaurant' as const, title: 'Cooking Essentials' },
  { icon: 'fast-food' as const, title: 'Packaged Food' },
  { icon: 'cafe' as const, title: 'Beverages' },
];

export const BEST_SELLERS = [
  {
    id: '1',
    image: IMAGES.atta,
    name: "Savaria Shudh Whole Wheat Atta",
    weight: "10 kg",
    basePrice: 371,
    baseMrp: 458,
    discount: "20% OFF"
  },
  {
    id: '2',
    image: IMAGES.rice,
    name: "Premium Basmati Rice",
    weight: "5 kg",
    basePrice: 299,
    baseMrp: 399,
    discount: "25% OFF"
  }
];

export const CATEGORIES = [
  {
    id: '1',
    title: "Fruits & Vegetables",
    startingPrice: "₹9/kg",
    image: IMAGES.fruits
  },
  {
    id: '2',
    title: "Masala & Spices",
    startingPrice: "₹45/pack",
    image: IMAGES.masala
  }
];