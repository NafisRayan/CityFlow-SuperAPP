import type { Address, PaymentMethod, User } from '../types';
import api from './api';

export const userService = {
  // Get user profile
  async getProfile(userId: string): Promise<User> {
    return api.get<User>(`/users/${userId}`);
  },

  // Update user profile
  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    return api.put<User>(`/users/${userId}`, data);
  },

  // Get user addresses
  async getAddresses(userId: string): Promise<Address[]> {
    return api.get<Address[]>(`/users/${userId}/addresses`);
  },

  // Add address
  async addAddress(userId: string, address: Omit<Address, 'id'>): Promise<Address> {
    return api.post<Address>(`/users/${userId}/addresses`, address);
  },

  // Update address
  async updateAddress(userId: string, addressId: string, data: Partial<Address>): Promise<Address> {
    return api.put<Address>(`/users/${userId}/addresses/${addressId}`, data);
  },

  // Delete address
  async deleteAddress(userId: string, addressId: string): Promise<void> {
    return api.delete<void>(`/users/${userId}/addresses/${addressId}`);
  },

  // Get payment methods
  async getPaymentMethods(userId: string): Promise<PaymentMethod[]> {
    return api.get<PaymentMethod[]>(`/users/${userId}/payment-methods`);
  },

  // Add payment method
  async addPaymentMethod(userId: string, method: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod> {
    return api.post<PaymentMethod>(`/users/${userId}/payment-methods`, method);
  },

  // Delete payment method
  async deletePaymentMethod(userId: string, methodId: string): Promise<void> {
    return api.delete<void>(`/users/${userId}/payment-methods/${methodId}`);
  },
};
