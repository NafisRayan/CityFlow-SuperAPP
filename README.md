# CityFlow - Super App

CityFlow is a comprehensive cross-platform mobile super app that seamlessly combines four core services into a unified, intuitive platform.

## Features

### 🚗 Ride Sharing
- Uber-like on-demand ride booking
- Multiple ride types (Economy, Comfort, Premium, XL)
- Real-time driver tracking
- Secure payment options
- Ride history and receipts

### 🍔 Food Delivery
- Browse local restaurants and menus
- Real-time order tracking
- Multiple cuisine categories
- Restaurant ratings and reviews
- Live delivery updates

### 🔧 Home Services
- Marketplace for local service providers
- Categories: Plumbing, Cleaning, Electrical, Carpentry, Beauty, and more
- Verified service providers
- Instant booking and scheduling
- Provider ratings and reviews

### 🛍️ E-commerce
- Shop from local stores
- Categories: Groceries, Electronics, Fashion, Home, Beauty
- Same-day delivery options
- Order tracking
- Deals and discounts

## Tech Stack

- **Framework**: React Native with Expo 54
- **UI Library**: HeroUI Native
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Context API
- **TypeScript**: Full type safety
- **Icons**: Expo Vector Icons (Ionicons)

## Project Structure

```
cityflow/
├── src/
│   ├── app/                    # Expo Router pages
│   │   ├── (tabs)/            # Tab navigation screens
│   │   │   ├── rides.tsx      # Ride sharing screen
│   │   │   ├── food.tsx       # Food delivery screen
│   │   │   ├── services.tsx   # Home services screen
│   │   │   ├── shop.tsx       # E-commerce screen
│   │   │   └── profile.tsx    # User profile screen
│   │   ├── _layout.tsx        # Root layout
│   │   └── index.tsx          # Entry point
│   ├── components/            # Reusable components
│   │   └── common/           # Common UI components
│   ├── contexts/             # React Context providers
│   │   ├── app-context.tsx   # App state management
│   │   └── app-theme-context.tsx
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts
│   ├── data/                 # Mock data
│   │   └── mock-data.ts
│   └── utils/                # Utility functions
│       ├── constants.ts
│       └── helpers.ts
├── assets/                   # Images, fonts, etc.
└── app.json                 # Expo configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Expo CLI (optional, but recommended)
- iOS Simulator (Mac only) or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cityflow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Development

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Screen**: Add a new file in `src/app/(tabs)/` or create a new route
2. **New Component**: Add to `src/components/`
3. **New Type**: Add to `src/types/index.ts`
4. **New Utility**: Add to `src/utils/`

## Future Enhancements

- [ ] Backend API integration
- [ ] Real-time location tracking with maps
- [ ] Push notifications
- [ ] Payment gateway integration
- [ ] Chat/messaging system
- [ ] Advanced search and filters
- [ ] User authentication (OAuth, biometric)
- [ ] Order scheduling
- [ ] Loyalty programs and rewards
- [ ] Multi-language support
- [ ] Dark mode optimization
- [ ] Offline mode support
- [ ] Analytics and reporting

## Backend Integration

To connect to a backend API:

1. Set the API URL in `.env`:
```
EXPO_PUBLIC_API_URL=https://your-api.com
```

2. Update `src/utils/constants.ts` with your API configuration

3. Create API service files in `src/services/`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.

## Get started

1. Clone the repository

   ```bash
   git clone https://github.com/heroui-inc/heroui-native-example.git
   cd heroui-native-example
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npx expo start
   ```

4. (Optional) Clean git history for a fresh start

   ```bash
   rm -rf .git
   git init
   git add .
   git commit -m "Initial commit"
   ```

You can start developing by editing the files inside the **src/app** directory. This project uses file-based routing with Expo Router.

## Get a fresh project

When you're ready to start with a clean slate, run:

```bash
npm run reset-project
```

This command will move the current **src** directory to **app-example-src** and create a new **src/app** directory with basic HeroUI Native setup where you can start developing.

## About HeroUI Native

HeroUI Native is a comprehensive UI library built for React Native that provides:

- Beautiful, accessible components out of the box
- Consistent design system
- TypeScript support
- Customizable theming
- Modern styling with NativeWind/Tailwind CSS

Learn more about HeroUI Native at: https://github.com/heroui-inc/heroui-native