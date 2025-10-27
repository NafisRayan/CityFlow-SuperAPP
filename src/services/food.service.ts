import type { FoodOrder, Restaurant } from '../types';
import api from './api';

export const foodService = {
  // Get nearby restaurants
  async getNearbyRestaurants(latitude: number, longitude: number): Promise<Restaurant[]> {
    return api.get<Restaurant[]>(`/food/restaurants/nearby?lat=${latitude}&lng=${longitude}`);
  },

  // Get restaurant details
  async getRestaurantDetails(restaurantId: string): Promise<Restaurant> {
    return api.get<Restaurant>(`/food/restaurants/${restaurantId}`);
  },

  // Place food order
  async placeOrder(orderData: any): Promise<FoodOrder> {
    return api.post<FoodOrder>('/food/orders', orderData);
  },

  // Get order details
  async getOrderDetails(orderId: string): Promise<FoodOrder> {
    return api.get<FoodOrder>(`/food/orders/${orderId}`);
  },

  // Track order
  async trackOrder(orderId: string): Promise<any> {
    return api.get<any>(`/food/orders/${orderId}/track`);
  },

  // Cancel order
  async cancelOrder(orderId: string): Promise<void> {
    return api.post<void>(`/food/orders/${orderId}/cancel`, {});
  },

  // Get order history
  async getOrderHistory(userId: string): Promise<FoodOrder[]> {
    return api.get<FoodOrder[]>(`/users/${userId}/food-orders`);
  },
};
