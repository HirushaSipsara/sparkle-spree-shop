export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  category?: Category;
  stock_quantity: number;
  is_featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customMessage?: string;
  giftWrapping?: boolean;
}

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total_amount: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: ShippingAddress;
  payment_method?: string;
  stripe_session_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'customer' | 'admin';
  created_at?: string;
  updated_at?: string;
}