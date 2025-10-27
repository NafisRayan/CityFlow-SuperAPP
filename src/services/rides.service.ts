import type { Driver, RideRequest } from '../types';
import api from './api';

export const ridesService = {
  // Request a new ride
  async requestRide(data: {
    pickupLocation: any;
    dropoffLocation: any;
    rideType: string;
  }): Promise<RideRequest> {
    return api.post<RideRequest>('/rides/request', data);
  },

  // Get available drivers nearby
  async getNearbyDrivers(latitude: number, longitude: number): Promise<Driver[]> {
    return api.get<Driver[]>(`/rides/drivers/nearby?lat=${latitude}&lng=${longitude}`);
  },

  // Get ride details
  async getRideDetails(rideId: string): Promise<RideRequest> {
    return api.get<RideRequest>(`/rides/${rideId}`);
  },

  // Cancel ride
  async cancelRide(rideId: string): Promise<void> {
    return api.post<void>(`/rides/${rideId}/cancel`, {});
  },

  // Get ride history
  async getRideHistory(userId: string): Promise<RideRequest[]> {
    return api.get<RideRequest[]>(`/users/${userId}/rides`);
  },

  // Rate driver
  async rateDriver(rideId: string, rating: number, comment?: string): Promise<void> {
    return api.post<void>(`/rides/${rideId}/rate`, { rating, comment });
  },
};
