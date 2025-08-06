import { Product, Category } from '@/types/product';
import graduationTeddyImg from '@/assets/graduation-teddy.jpg';
import romanticGiftImg from '@/assets/romantic-gift.jpg';

export const categories: Category[] = [
  {
    id: 'cat-graduation',
    name: 'Graduation',
    description: 'Celebrate academic achievements with our adorable graduation teddy bears and gifts',
    image_url: graduationTeddyImg,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'cat-romantic',
    name: 'Romantic',
    description: 'Express your love with our romantic Valentine\'s Day gifts and beautiful arrangements',
    image_url: romanticGiftImg,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const products: Product[] = [
  // Graduation Products
  {
    id: 'prod-grad-teddy-1',
    name: 'Classic Graduation Teddy Bear',
    description: 'Adorable brown teddy bear wearing a traditional black graduation cap and gown. Perfect for celebrating graduation achievements.',
    price: 24.99,
    image_url: graduationTeddyImg,
    category_id: 'cat-graduation',
    category: categories[0],
    stock_quantity: 50,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-grad-teddy-2',
    name: 'Personalized Graduation Bear',
    description: 'Customizable graduation teddy bear with embroidered name and graduation year. Comes with mini diploma.',
    price: 34.99,
    image_url: graduationTeddyImg,
    category_id: 'cat-graduation',
    category: categories[0],
    stock_quantity: 30,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-grad-teddy-3',
    name: 'Graduation Bear Gift Set',
    description: 'Complete graduation gift set including teddy bear, congratulations card, and gift box.',
    price: 45.99,
    image_url: graduationTeddyImg,
    category_id: 'cat-graduation',
    category: categories[0],
    stock_quantity: 25,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-grad-teddy-4',
    name: 'Mini Graduation Bears (Set of 3)',
    description: 'Set of three small graduation teddy bears in different colors. Perfect for group gifts.',
    price: 39.99,
    image_url: graduationTeddyImg,
    category_id: 'cat-graduation',
    category: categories[0],
    stock_quantity: 40,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Romantic Products
  {
    id: 'prod-rom-gift-1',
    name: 'Valentine\'s Day Luxury Gift Box',
    description: 'Elegant gift box filled with premium chocolates, red roses, and a heartfelt card.',
    price: 89.99,
    image_url: romanticGiftImg,
    category_id: 'cat-romantic',
    category: categories[1],
    stock_quantity: 20,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-rom-gift-2',
    name: 'Romantic Rose Bouquet',
    description: 'Beautiful arrangement of 12 red roses with baby\'s breath and elegant wrapping.',
    price: 49.99,
    image_url: romanticGiftImg,
    category_id: 'cat-romantic',
    category: categories[1],
    stock_quantity: 15,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-rom-gift-3',
    name: 'Heart-Shaped Chocolate Collection',
    description: 'Premium assorted chocolates in heart shapes, beautifully packaged in a romantic box.',
    price: 29.99,
    image_url: romanticGiftImg,
    category_id: 'cat-romantic',
    category: categories[1],
    stock_quantity: 60,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-rom-gift-4',
    name: 'Romantic Teddy & Roses Combo',
    description: 'Adorable teddy bear holding roses with a love message. Perfect for Valentine\'s Day.',
    price: 39.99,
    image_url: romanticGiftImg,
    category_id: 'cat-romantic',
    category: categories[1],
    stock_quantity: 35,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-rom-gift-5',
    name: 'Anniversary Special Package',
    description: 'Complete anniversary package with champagne, chocolates, flowers, and keepsake box.',
    price: 129.99,
    image_url: romanticGiftImg,
    category_id: 'cat-romantic',
    category: categories[1],
    stock_quantity: 10,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category_id === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.is_featured);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};