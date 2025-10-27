# CityFlow Quick Start Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** - [Download](https://git-scm.com/)

For mobile development:
- **iOS**: macOS with Xcode installed
- **Android**: Android Studio with Android SDK
- **Expo Go** app on your mobile device (for quick testing)

## Installation Steps

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd cityflow
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React Native and Expo
- HeroUI Native (UI components)
- Navigation libraries
- TypeScript and type definitions

### 3. Start the Development Server

```bash
npm start
```

This will start the Expo development server and show a QR code.

### 4. Run on Your Device

#### Option A: Using Expo Go (Easiest)

1. Install **Expo Go** from App Store (iOS) or Play Store (Android)
2. Scan the QR code shown in your terminal
3. The app will load on your device

#### Option B: Using Emulator/Simulator

**For iOS (Mac only):**
```bash
npm run ios
```

**For Android:**
```bash
npm run android
```

**For Web:**
```bash
npm run web
```

## Project Structure Overview

```
cityflow/
├── src/
│   ├── app/              # All screens and routes
│   │   ├── (tabs)/      # Main tab screens
│   │   │   ├── rides.tsx      # Ride sharing
│   │   │   ├── food.tsx       # Food delivery
│   │   │   ├── services.tsx   # Home services
│   │   │   ├── shop.tsx       # E-commerce
│   │   │   └── profile.tsx    # User profile
│   │   └── _layout.tsx  # Root layout with providers
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React Context for state
│   ├── services/        # API service layer
│   ├── types/          # TypeScript definitions
│   ├── utils/          # Helper functions
│   └── data/           # Mock data
└── assets/             # Images, fonts, icons
```

## Understanding the App

### Navigation Structure

The app uses **Expo Router** with file-based routing:

- `src/app/index.tsx` - Entry point (redirects to rides)
- `src/app/(tabs)/_layout.tsx` - Tab navigation setup
- `src/app/(tabs)/*.tsx` - Individual tab screens

### State Management

The app uses React Context API:

- `AppContext` - Global app state (user, orders, bookings)
- `AppThemeContext` - Theme management

### Services Architecture

API services are organized by feature:

- `rides.service.ts` - Ride sharing API calls
- `food.service.ts` - Food delivery API calls
- `services.service.ts` - Home services API calls
- `shop.service.ts` - E-commerce API calls
- `user.service.ts` - User profile and settings

## Making Your First Changes

### 1. Modify a Screen

Edit any file in `src/app/(tabs)/` to see changes:

```typescript
// src/app/(tabs)/rides.tsx
<Text style={styles.title}>Book Your Ride</Text>
```

Save the file and the app will automatically reload.

### 2. Add a New Component

Create a new component in `src/components/`:

```typescript
// src/components/common/Badge.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Badge({ text }: { text: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
```

### 3. Add Mock Data

Add data to `src/data/mock-data.ts`:

```typescript
export const mockNewRestaurant = {
  id: '4',
  name: 'Taco Town',
  cuisine: ['Mexican'],
  rating: 4.6,
  // ... more fields
};
```

## Common Tasks

### Adding a New Screen

1. Create a new file in `src/app/`
2. Export a React component
3. The route is automatically created based on filename

Example: `src/app/settings.tsx` → `/settings` route

### Styling Components

The app uses React Native StyleSheet:

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
});
```

### Using Icons

The app uses Ionicons from Expo:

```typescript
import { Ionicons } from '@expo/vector-icons';

<Ionicons name="car" size={24} color="#3B82F6" />
```

Browse icons: [Ionic Icons](https://ionic.io/ionicons)

## Connecting to a Backend

### 1. Set Up Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your API URL:

```
EXPO_PUBLIC_API_URL=https://your-api.com
```

### 2. Use API Services

The services are already set up. Just call them:

```typescript
import { ridesService } from '../services/rides.service';

const requestRide = async () => {
  try {
    const ride = await ridesService.requestRide({
      pickupLocation: pickup,
      dropoffLocation: dropoff,
      rideType: 'economy',
    });
    console.log('Ride requested:', ride);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## Debugging

### View Logs

Logs appear in your terminal where you ran `npm start`.

### React Native Debugger

1. Press `j` in the terminal to open debugger
2. Or shake your device and select "Debug"

### Common Issues

**Metro bundler issues:**
```bash
npm start -- --clear
```

**iOS build issues:**
```bash
cd ios && pod install && cd ..
npm run ios
```

**Android build issues:**
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

## Next Steps

1. **Explore the Code**: Browse through `src/app/(tabs)/` to see each service
2. **Add Features**: Check `FEATURES.md` for feature ideas
3. **Connect Backend**: Implement API integration using the service layer
4. **Customize UI**: Modify styles and components to match your brand
5. **Add Maps**: Integrate Google Maps or Mapbox for location features
6. **Add Payments**: Integrate Stripe or other payment gateways
7. **Add Auth**: Implement user authentication

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [HeroUI Native](https://github.com/heroui-inc/heroui-native)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Help

- Check `FEATURES.md` for feature documentation
- Review `README.md` for project overview
- Open an issue on GitHub
- Check Expo forums and Discord

## Development Tips

1. **Hot Reload**: Changes auto-reload, but sometimes you need to refresh manually (shake device → Reload)
2. **TypeScript**: Use types for better IDE support and fewer bugs
3. **Component Reuse**: Create reusable components in `src/components/`
4. **State Management**: Use Context for global state, local state for component-specific data
5. **Performance**: Use `React.memo()` and `useMemo()` for expensive operations
6. **Testing**: Write tests as you build features

Happy coding! 🚀
