import { useState, useEffect } from 'react';
import { CartItem, Product } from '@/types/product';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('gift-shop-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('gift-shop-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1, customMessage?: string, giftWrapping?: boolean) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => 
        item.product.id === product.id && 
        item.customMessage === customMessage && 
        item.giftWrapping === giftWrapping
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { product, quantity, customMessage, giftWrapping }];
      }
    });
  };

  const removeFromCart = (productId: string, customMessage?: string, giftWrapping?: boolean) => {
    setItems(prevItems => 
      prevItems.filter(item => 
        !(item.product.id === productId && 
          item.customMessage === customMessage && 
          item.giftWrapping === giftWrapping)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, customMessage?: string, giftWrapping?: boolean) => {
    if (quantity <= 0) {
      removeFromCart(productId, customMessage, giftWrapping);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId && 
        item.customMessage === customMessage && 
        item.giftWrapping === giftWrapping
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const basePrice = item.product.price * item.quantity;
      const giftWrappingFee = item.giftWrapping ? 5.99 * item.quantity : 0;
      return total + basePrice + giftWrappingFee;
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount,
  };
};