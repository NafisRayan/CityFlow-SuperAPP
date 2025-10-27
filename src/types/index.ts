// Core User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'wallet' | 'cash';
  label: string;
  last4?: string;
  isDefault: boolean;
}

// Ride Sharing Types
export interface RideRequest {
  id: string;
  userId: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  rideType: 'economy' | 'comfort' | 'premium' | 'xl';
  status: 'pending' | 'accepted' | 'arrived' | 'in-progress' | 'completed' | 'cancelled';
  estimatedPrice: number;
  estimatedTime: number;
  driver?: Driver;
  createdAt: Date;
}

export interface Driver {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  vehicle: {
    make: string;
    model: string;
    color: string;
    plate: string;
  };
  location: Location;
  phone: string;
}

export interface Location {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// Food Delivery Types
export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  isOpen: boolean;
  distance: number;
  menu: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegetarian?: boolean;
  isPopular?: boolean;
  customizations?: MenuCustomization[];
}

export interface MenuCustomization {
  id: string;
  name: string;
  required: boolean;
  options: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface FoodOrder {
  id: string;
  userId: string;
  restaurant: Restaurant;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  deliveryAddress: Address;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked-up' | 'delivered' | 'cancelled';
  estimatedDeliveryTime: Date;
  driver?: Driver;
  createdAt: Date;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: string[];
  specialInstructions?: string;
}

// Home Services Types
export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  basePrice: number;
  priceUnit: 'hour' | 'job' | 'sqft';
}

export interface ServiceProvider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  services: string[];
  experience: string;
  isVerified: boolean;
  availability: string[];
  hourlyRate?: number;
}

export interface ServiceBooking {
  id: string;
  userId: string;
  service: Service;
  provider: ServiceProvider;
  scheduledDate: Date;
  scheduledTime: string;
  address: Address;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  price: number;
  notes?: string;
  createdAt: Date;
}

// E-commerce Types
export interface Store {
  id: string;
  name: string;
  logo: string;
  category: string;
  rating: number;
  deliveryTime: string;
  isOpen: boolean;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  reviewCount: number;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

export interface ShoppingOrder {
  id: string;
  userId: string;
  store: Store;
  items: ShoppingCartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  deliveryAddress: Address;
  status: 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
  estimatedDeliveryTime: Date;
  trackingNumber?: string;
  createdAt: Date;
}

export interface ShoppingCartItem {
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

// Common Types
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'ride' | 'food' | 'service' | 'shopping' | 'general';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  data?: any;
}
