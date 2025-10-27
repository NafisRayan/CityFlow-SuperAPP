// App Configuration
export const APP_NAME = 'CityFlow';
export const APP_VERSION = '1.0.0';

// API Configuration (for future backend integration)
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.cityflow.com';
export const API_TIMEOUT = 30000;

// Map Configuration
export const DEFAULT_LOCATION = {
  latitude: 37.78825,
  longitude: -122.4324,
};

export const MAP_DELTA = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// Service Categories
export const RIDE_TYPES = [
  { id: 'economy', name: 'Economy', multiplier: 1.0 },
  { id: 'comfort', name: 'Comfort', multiplier: 1.5 },
  { id: 'premium', name: 'Premium', multiplier: 2.3 },
  { id: 'xl', name: 'XL', multiplier: 1.8 },
];

export const SERVICE_CATEGORIES = [
  'Cleaning',
  'Plumbing',
  'Electrical',
  'Carpentry',
  'Painting',
  'AC Repair',
  'Beauty',
  'Pest Control',
];

export const FOOD_CATEGORIES = [
  'All',
  'Pizza',
  'Burgers',
  'Asian',
  'Desserts',
  'Healthy',
  'Mexican',
  'Italian',
];

export const SHOPPING_CATEGORIES = [
  'All',
  'Groceries',
  'Electronics',
  'Fashion',
  'Home',
  'Beauty',
  'Sports',
  'Books',
];

// Payment Methods
export const PAYMENT_TYPES = {
  CARD: 'card',
  WALLET: 'wallet',
  CASH: 'cash',
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  PICKED_UP: 'picked-up',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Ride Status
export const RIDE_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  ARRIVED: 'arrived',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Colors
export const COLORS = {
  primary: '#3B82F6',
  secondary: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  info: '#06B6D4',
  dark: '#111827',
  light: '#F9FAFB',
  gray: '#6B7280',
};
