import type { Product, ShoppingOrder, Store } from '../types';
import api from './api';

export const shopService = {
  // Get nearby stores
  async getNearbyStores(latitude: number, longitude: number): Promise<Store[]> {
    return api.get<Store[]>(`/shop/stores/nearby?lat=${latitude}&lng=${longitude}`);
  },

  // Get store details
  async getStoreDetails(storeId: string): Promise<Store> {
    return api.get<Store>(`/shop/stores/${storeId}`);
  },

  // Search products
  async searchProducts(query: string, category?: string): Promise<Product[]> {
    const endpoint = category
      ? `/shop/products/search?q=${query}&category=${category}`
      : `/shop/products/search?q=${query}`;
    return api.get<Product[]>(endpoint);
  },

  // Get product details
  async getProductDetails(productId: string): Promise<Product> {
    return api.get<Product>(`/shop/products/${productId}`);
  },

  // Place order
  async placeOrder(data: {
    storeId: string;
    items: any[];
    addressId: string;
    paymentMethodId: string;
  }): Promise<ShoppingOrder> {
    return api.post<ShoppingOrder>('/shop/orders', data);
  },

  // Get order details
  async getOrderDetails(orderId: string): Promise<ShoppingOrder> {
    return api.get<ShoppingOrder>(`/shop/orders/${orderId}`);
  },

  // Track order
  async trackOrder(orderId: string): Promise<any> {
    return api.get<any>(`/shop/orders/${orderId}/track`);
  },

  // Cancel order
  async cancelOrder(orderId: string): Promise<void> {
    return api.post<void>(`/shop/orders/${orderId}/cancel`, {});
  },

  // Get order history
  async getOrderHistory(userId: string): Promise<ShoppingOrder[]> {
    return api.get<ShoppingOrder[]>(`/users/${userId}/shopping-orders`);
  },
};
