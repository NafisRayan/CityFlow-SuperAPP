import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Device size breakpoints
export const isSmallDevice = width < 375;
export const isMediumDevice = width >= 375 && width < 768;
export const isLargeDevice = width >= 768;
export const isTablet = width >= 768;

// Responsive padding
export const PADDING = {
  xs: isSmallDevice ? 8 : 12,
  sm: isSmallDevice ? 12 : 16,
  md: isSmallDevice ? 16 : 20,
  lg: isSmallDevice ? 20 : 24,
  xl: isSmallDevice ? 24 : 32,
};

// Responsive font sizes
export const FONT_SIZE = {
  xs: isSmallDevice ? 10 : 12,
  sm: isSmallDevice ? 12 : 14,
  md: isSmallDevice ? 14 : 16,
  lg: isSmallDevice ? 16 : 18,
  xl: isSmallDevice ? 18 : 20,
  xxl: isSmallDevice ? 20 : 24,
  xxxl: isSmallDevice ? 24 : 28,
};

// Responsive spacing
export const SPACING = {
  xs: isSmallDevice ? 4 : 6,
  sm: isSmallDevice ? 8 : 10,
  md: isSmallDevice ? 12 : 16,
  lg: isSmallDevice ? 16 : 20,
  xl: isSmallDevice ? 20 : 24,
  xxl: isSmallDevice ? 24 : 32,
};

// Responsive icon sizes
export const ICON_SIZE = {
  xs: isSmallDevice ? 16 : 18,
  sm: isSmallDevice ? 18 : 20,
  md: isSmallDevice ? 20 : 24,
  lg: isSmallDevice ? 24 : 28,
  xl: isSmallDevice ? 28 : 32,
};

// Responsive card dimensions
export const CARD = {
  borderRadius: 12,
  padding: PADDING.md,
  margin: PADDING.sm,
};

// Screen dimensions
export const SCREEN = {
  width,
  height,
  isSmall: isSmallDevice,
  isMedium: isMediumDevice,
  isLarge: isLargeDevice,
  isTablet,
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  isWeb: Platform.OS === 'web',
};

// Grid columns
export const getGridColumns = (itemsPerRow: { small: number; medium: number; large: number }) => {
  if (isLargeDevice) return itemsPerRow.large;
  if (isMediumDevice) return itemsPerRow.medium;
  return itemsPerRow.small;
};

// Calculate item width for grid
export const getItemWidth = (columns: number, spacing: number = SPACING.md) => {
  const totalSpacing = spacing * (columns + 1);
  return (width - totalSpacing) / columns;
};

// Responsive value
export const responsive = (small: number, medium: number, large: number) => {
  if (isLargeDevice) return large;
  if (isMediumDevice) return medium;
  return small;
};

// Scale size based on screen width
export const scale = (size: number) => {
  const baseWidth = 375; // iPhone SE width
  return (width / baseWidth) * size;
};

// Vertical scale based on screen height
export const verticalScale = (size: number) => {
  const baseHeight = 667; // iPhone SE height
  return (height / baseHeight) * size;
};

// Moderate scale - less aggressive scaling
export const moderateScale = (size: number, factor: number = 0.5) => {
  return size + (scale(size) - size) * factor;
};
