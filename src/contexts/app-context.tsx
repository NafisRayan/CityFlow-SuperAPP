import React, { createContext, ReactNode, useContext, useState } from 'react';
import type { FoodOrder, RideRequest, ServiceBooking, ShoppingOrder, User } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  activeRide: RideRequest | null;
  setActiveRide: (ride: RideRequest | null) => void;
  activeFoodOrder: FoodOrder | null;
  setActiveFoodOrder: (order: FoodOrder | null) => void;
  activeServiceBooking: ServiceBooking | null;
  setActiveServiceBooking: (booking: ServiceBooking | null) => void;
  activeShoppingOrder: ShoppingOrder | null;
  setActiveShoppingOrder: (order: ShoppingOrder | null) => void;
  cartItemsCount: number;
  setCartItemsCount: (count: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [activeRide, setActiveRide] = useState<RideRequest | null>(null);
  const [activeFoodOrder, setActiveFoodOrder] = useState<FoodOrder | null>(null);
  const [activeServiceBooking, setActiveServiceBooking] = useState<ServiceBooking | null>(null);
  const [activeShoppingOrder, setActiveShoppingOrder] = useState<ShoppingOrder | null>(null);
  const [cartItemsCount, setCartItemsCount] = useState(0);

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
        cartItemsCount,
        setCartItemsCount,
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
