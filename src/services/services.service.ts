import type { ServiceBooking, ServiceCategory, ServiceProvider } from '../types';
import api from './api';

export const servicesService = {
  // Get service categories
  async getCategories(): Promise<ServiceCategory[]> {
    return api.get<ServiceCategory[]>('/services/categories');
  },

  // Get service providers
  async getProviders(categoryId?: string): Promise<ServiceProvider[]> {
    const endpoint = categoryId
      ? `/services/providers?category=${categoryId}`
      : '/services/providers';
    return api.get<ServiceProvider[]>(endpoint);
  },

  // Get provider details
  async getProviderDetails(providerId: string): Promise<ServiceProvider> {
    return api.get<ServiceProvider>(`/services/providers/${providerId}`);
  },

  // Book a service
  async bookService(data: {
    serviceId: string;
    providerId: string;
    scheduledDate: Date;
    scheduledTime: string;
    addressId: string;
    notes?: string;
  }): Promise<ServiceBooking> {
    return api.post<ServiceBooking>('/services/bookings', data);
  },

  // Get booking details
  async getBookingDetails(bookingId: string): Promise<ServiceBooking> {
    return api.get<ServiceBooking>(`/services/bookings/${bookingId}`);
  },

  // Cancel booking
  async cancelBooking(bookingId: string): Promise<void> {
    return api.post<void>(`/services/bookings/${bookingId}/cancel`, {});
  },

  // Get booking history
  async getBookingHistory(userId: string): Promise<ServiceBooking[]> {
    return api.get<ServiceBooking[]>(`/users/${userId}/service-bookings`);
  },

  // Rate provider
  async rateProvider(bookingId: string, rating: number, comment?: string): Promise<void> {
    return api.post<void>(`/services/bookings/${bookingId}/rate`, { rating, comment });
  },
};
