import React, { createContext, ReactNode, useContext, useState } from 'react';
import { demoUser } from '../data/demo-data';
import type { FoodOrder, MenuItem, Product, RideRequest, ServiceBooking, ShoppingOrder, User } from '../types';

interface CartItem extends MenuItem {
  quantity: number;
}

interface ShoppingCartItem extends Product {
  quantity: number;
}

interface AppContextType {
  user: User;
  setUser: (user: User) => void;
  activeRide: RideRequest | null;
  setActiveRide: (ride: RideRequest | null) => void;
  activeFoodOrder: FoodOrder | null;
  setActiveFoodOrder: (order: FoodOrder | null) => void;
  activeServiceBooking: ServiceBooking | null;
  setActiveServiceBooking: (booking: ServiceBooking | null) => void;
  activeShoppingOrder: ShoppingOrder | null;
  setActiveShoppingOrder: (order: ShoppingOrder | null) => void;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  shoppingCart: ShoppingCartItem[];
  addToShoppingCart: (item: ShoppingCartItem) => void;
  removeFromShoppingCart: (itemId: string) => void;
  clearShoppingCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(demoUser);
  const [activeRide, setActiveRide] = useState<RideRequest | null>(null);
  const [activeFoodOrder, setActiveFoodOrder] = useState<FoodOrder | null>(null);
  const [activeServiceBooking, setActiveServiceBooking] = useState<ServiceBooking | null>(null);
  const [activeShoppingOrder, setActiveShoppingOrder] = useState<ShoppingOrder | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        const newQuantity = existing.quantity + item.quantity;
        if (newQuantity <= 0) {
          return prev.filter(i => i.id !== item.id);
        }
        return prev.map(i => i.id === item.id ? { ...i, quantity: newQuantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToShoppingCart = (item: ShoppingCartItem) => {
    setShoppingCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        const newQuantity = existing.quantity + item.quantity;
        if (newQuantity <= 0) {
          return prev.filter(i => i.id !== item.id);
        }
        return prev.map(i => i.id === item.id ? { ...i, quantity: newQuantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromShoppingCart = (itemId: string) => {
    setShoppingCart(prev => prev.filter(i => i.id !== itemId));
  };

  const clearShoppingCart = () => {
    setShoppingCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        activeRide,
        setActiveRide,
        activeFoodOrder,
        setActiveFoodOrder,
        activeServiceBooking,
        setActiveServiceBooking,
        activeShoppingOrder,
        setActiveShoppingOrder,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        shoppingCart,
        addToShoppingCart,
        removeFromShoppingCart,
        clearShoppingCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
