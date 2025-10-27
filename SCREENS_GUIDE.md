# CityFlow Screens Guide

This document provides a visual guide to all screens in the CityFlow app, describing their purpose, features, and user interactions.

## 📱 App Navigation Structure

```
CityFlow App
│
├── Tab Navigation (Bottom)
│   ├── 🚗 Rides
│   ├── 🍔 Food
│   ├── 🔧 Services
│   ├── 🛍️ Shop
│   └── 👤 Profile
│
└── Future Screens
    ├── Order Details
    ├── Tracking
    ├── Payment
    ├── Settings
    └── More...
```

---

## 1. 🚗 Rides Screen

**File**: `src/app/(tabs)/rides.tsx`

### Purpose
Book on-demand rides with multiple vehicle options and real-time pricing.

### Screen Layout

```
┌─────────────────────────────────┐
│  Book a Ride            [⏰]    │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🟢 Current Location     │   │
│  │ ┊                       │   │
│  │ 🔴 Where to?            │   │
│  └─────────────────────────┘   │
│                                 │
│  Choose a ride                  │
│  ┌─────────────────────────┐   │
│  │ 🚗 Economy    3 min  $12│   │
│  ├─────────────────────────┤   │
│  │ 🏎️ Comfort    5 min  $18│   │
│  ├─────────────────────────┤   │
│  │ 💎 Premium    8 min  $28│   │
│  ├─────────────────────────┤   │
│  │ 🚐 XL         6 min  $22│   │
│  └─────────────────────────┘   │
│                                 │
│  💳 Visa •••• 4242         [>] │
│                                 │
│  ┌─────────────────────────┐   │
│  │    Request Ride         │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

### Features
- **Location Selection**
  - Pickup location (default: current location)
  - Dropoff location input
  - Location icons (green for pickup, red for dropoff)

- **Ride Types**
  - Economy: Budget-friendly option
  - Comfort: Mid-range comfort
  - Premium: Luxury vehicles
  - XL: Larger vehicles for groups
  - Each shows: estimated time, capacity, price

- **Payment Method**
  - Display selected payment method
  - Tap to change payment method

- **Request Button**
  - Primary action button
  - Initiates ride request

### User Flow
1. User opens Rides tab
2. Confirms pickup location
3. Enters dropoff location
4. Selects ride type
5. Reviews payment method
6. Taps "Request Ride"
7. (Future) Matches with driver
8. (Future) Tracks ride in real-time

---

## 2. 🍔 Food Screen

**File**: `src/app/(tabs)/food.tsx`

### Purpose
Browse restaurants, view menus, and order food for delivery.

### Screen Layout

```
┌─────────────────────────────────┐
│  Deliver to                     │
│  123 Main St, City    [v] [🛒3]│
├─────────────────────────────────┤
│  🔍 Search restaurants...       │
│                                 │
│  [All][Pizza][Burgers][Asian]   │
│                                 │
│  Popular Restaurants            │
│  ┌─────────────────────────┐   │
│  │ [Restaurant Image]      │   │
│  │ Pizza Palace            │   │
│  │ Italian • Pizza         │   │
│  │ ⭐ 4.5  ⏱️ 25-35 min    │   │
│  │ 🚴 $2.99                │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │ [Restaurant Image]      │   │
│  │ Burger House            │   │
│  │ American • Burgers      │   │
│  │ ⭐ 4.7  ⏱️ 20-30 min    │   │
│  │ 🚴 $1.99                │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

### Features
- **Header**
  - Delivery address with dropdown
  - Shopping cart icon with item count badge

- **Search Bar**
  - Search restaurants or dishes
  - Real-time search (future)

- **Category Filters**
  - Horizontal scrollable chips
  - Categories: All, Pizza, Burgers, Asian, Desserts, Healthy
  - Active category highlighted

- **Restaurant Cards**
  - Restaurant image
  - Name and cuisine types
  - Rating with star icon
  - Delivery time estimate
  - Delivery fee
  - Distance from user

### User Flow
1. User opens Food tab
2. Confirms delivery address
3. Browses categories or searches
4. Selects a restaurant
5. (Future) Views menu
6. (Future) Adds items to cart
7. (Future) Proceeds to checkout

---

## 3. 🔧 Services Screen

**File**: `src/app/(tabs)/services.tsx`

### Purpose
Find and book local service providers for home services.

### Screen Layout

```
┌─────────────────────────────────┐
│  Home Services          [🔔]    │
├─────────────────────────────────┤
│  🔍 Search for services...      │
│                                 │
│  Categories                     │
│  ┌────┬────┬────┬────┐         │
│  │✨  │💧  │⚡  │🔨  │         │
│  │Cln │Plm │Elc │Crp │         │
│  ├────┼────┼────┼────┤         │
│  │🎨  │❄️  │✂️  │🐛  │         │
│  │Pnt │AC  │Bty │Pst │         │
│  └────┴────┴────┴────┘         │
│                                 │
│  Top Rated Providers  [See All]│
│  ┌─────────────────────────┐   │
│  │ [JS] John Smith      ✓  │   │
│  │ Plumbing                │   │
│  │ ⭐ 4.9 (234) • 8 years  │   │
│  │                    $45/hr│   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │ [SJ] Sarah Johnson   ✓  │   │
│  │ Cleaning                │   │
│  │ ⭐ 4.8 (189) • 5 years  │   │
│  │                    $35/hr│   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

### Features
- **Header**
  - Screen title
  - Notification bell icon

- **Search Bar**
  - Search for specific services

- **Service Categories Grid**
  - 8 categories in 4x2 grid
  - Icon and name for each
  - Categories: Cleaning, Plumbing, Electrical, Carpentry, Painting, AC Repair, Beauty, Pest Control

- **Provider Cards**
  - Provider avatar with initials
  - Name with verification badge
  - Service type
  - Rating, review count, experience
  - Hourly rate

### User Flow
1. User opens Services tab
2. Browses categories or searches
3. Selects a category
4. (Future) Views providers in category
5. (Future) Selects a provider
6. (Future) Books a service
7. (Future) Confirms booking details

---

## 4. 🛍️ Shop Screen

**File**: `src/app/(tabs)/shop.tsx`

### Purpose
Shop from local stores for groceries, electronics, fashion, and more.

### Screen Layout

```
┌─────────────────────────────────┐
│  Shop Local                     │
│  123 Main St        [v]  [🛒5] │
├─────────────────────────────────┤
│  🔍 Search products or stores...│
│                                 │
│  [All][Groceries][Electronics]  │
│                                 │
│  Nearby Stores        [See All] │
│  ┌──────┐ ┌──────┐             │
│  │[Logo]│ │[Logo]│             │
│  │Fresh │ │Tech  │             │
│  │Market│ │Hub   │             │
│  │⭐4.6 │ │⭐4.8 │             │
│  └──────┘ └──────┘             │
│                                 │
│  Deals for You        [See All] │
│  ┌──────┐ ┌──────┐             │
│  │30%OFF│ │20%OFF│             │
│  │[Img] │ │[Img] │             │
│  │Apples│ │Headph│             │
│  │$4.99 │ │$79.99│             │
│  │⭐4.5 │ │⭐4.7 │             │
│  └──────┘ └──────┘             │
└─────────────────────────────────┘
```

### Features
- **Header**
  - Delivery address with dropdown
  - Shopping cart with item count

- **Search Bar**
  - Search products or stores

- **Category Filters**
  - Horizontal scrollable chips
  - Categories: All, Groceries, Electronics, Fashion, Home, Beauty

- **Nearby Stores**
  - Horizontal scrollable cards
  - Store logo/image
  - Store name and category
  - Rating and delivery time

- **Product Grid**
  - 2-column grid layout
  - Discount badges
  - Product images
  - Product name and store
  - Price (original and sale)
  - Rating

### User Flow
1. User opens Shop tab
2. Confirms delivery address
3. Browses categories or searches
4. Views stores or products
5. (Future) Selects a product
6. (Future) Adds to cart
7. (Future) Proceeds to checkout

---

## 5. 👤 Profile Screen

**File**: `src/app/(tabs)/profile.tsx`

### Purpose
Manage user profile, view activity, and access settings.

### Screen Layout

```
┌─────────────────────────────────┐
│  Profile                  [📤]  │
├─────────────────────────────────┤
│         ┌────────┐              │
│         │   JD   │              │
│         └────────┘              │
│        John Doe                 │
│    john.doe@example.com         │
│    +1 (555) 123-4567            │
│                                 │
│  ┌────┬────┬────┬────┐         │
│  │🚗  │🍔  │🔧  │🛒  │         │
│  │24  │48  │12  │36  │         │
│  │Ride│Ordr│Srvc│Shop│         │
│  └────┴────┴────┴────┘         │
├─────────────────────────────────┤
│  👤 Edit Profile           [>]  │
│  📍 Addresses              [>]  │
│  💳 Payment Methods        [>]  │
│  ⏱️ Order History          [>]  │
│  ❤️ Favorites              [>]  │
│  🔔 Notifications          [>]  │
│  ❓ Help & Support         [>]  │
│  ⚙️ Settings               [>]  │
├─────────────────────────────────┤
│  🚪 Logout                      │
│                                 │
│  Version 1.0.0                  │
└─────────────────────────────────┘
```

### Features
- **Header**
  - Screen title
  - Share icon

- **Profile Card**
  - User avatar with initials
  - Name, email, phone
  - Activity statistics (rides, orders, services, shopping)

- **Menu Items**
  - Edit Profile
  - Addresses
  - Payment Methods
  - Order History
  - Favorites
  - Notifications
  - Help & Support
  - Settings

- **Logout Button**
  - Red text with icon

- **Version Number**
  - App version display

### User Flow
1. User opens Profile tab
2. Views profile information
3. Checks activity statistics
4. Taps menu item to navigate
5. (Future) Edits profile
6. (Future) Manages addresses/payments
7. (Future) Views order history

---

## 🎨 Design Patterns

### Common Elements

**Navigation Bar**
- Fixed at bottom
- 5 tabs with icons
- Active tab highlighted in blue
- Inactive tabs in gray

**Headers**
- Screen title (left)
- Action icons (right)
- Consistent padding

**Cards**
- White background
- Rounded corners (12px)
- Shadow for depth
- Consistent padding (16px)

**Buttons**
- Primary: Blue background, white text
- Secondary: White background, blue text
- Rounded corners (12px)
- Consistent height (48px)

**Icons**
- Ionicons library
- Consistent sizing (20-24px)
- Color-coded by context

**Typography**
- Headings: Bold, 24-28px
- Body: Regular, 14-16px
- Captions: Regular, 12-14px
- Font: Inter

**Colors**
- Primary: #3B82F6 (Blue)
- Success: #10B981 (Green)
- Danger: #EF4444 (Red)
- Warning: #F59E0B (Amber)
- Text: #111827 (Dark Gray)
- Background: #F9FAFB (Light Gray)

---

## 📱 Responsive Design

All screens are designed to work on:
- iPhone (various sizes)
- iPad
- Android phones
- Android tablets

### Breakpoints
- Small: < 375px
- Medium: 375px - 768px
- Large: > 768px

---

## 🔄 Future Screens

### Planned Additions

**Ride Tracking**
- Real-time map view
- Driver location
- ETA updates
- Driver contact

**Restaurant Menu**
- Menu categories
- Item details
- Customization options
- Add to cart

**Service Booking**
- Calendar view
- Time slot selection
- Service details
- Provider profile

**Product Details**
- Product images gallery
- Detailed description
- Variants selection
- Reviews

**Checkout**
- Cart review
- Address selection
- Payment method
- Order confirmation

**Order Tracking**
- Real-time status
- Delivery tracking
- Contact delivery person
- Order details

**Settings**
- Account settings
- Notification preferences
- Language selection
- Privacy settings

---

## 🎯 Interaction Patterns

### Tap Actions
- Cards: Navigate to details
- Buttons: Perform action
- Icons: Open related screen
- Chips: Filter content

### Swipe Actions
- Horizontal scroll: Categories, stores
- Vertical scroll: Main content
- (Future) Swipe to delete: Cart items

### Pull to Refresh
- (Future) All list screens

### Loading States
- (Future) Skeleton screens
- (Future) Spinners for actions

### Error States
- (Future) Error messages
- (Future) Retry buttons

---

## 📊 Screen Metrics

### Performance Targets
- Initial render: < 500ms
- Smooth scrolling: 60 FPS
- Image loading: Progressive
- Transitions: < 300ms

### Accessibility
- Screen reader support
- Sufficient color contrast
- Touch target size: 44x44px
- Keyboard navigation (web)

---

For implementation details, see:
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture
- [CONTRIBUTING.md](CONTRIBUTING.md) - Development guidelines
- [FEATURES.md](FEATURES.md) - Feature specifications
