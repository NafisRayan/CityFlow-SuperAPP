import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../contexts/app-context';
import { demoProducts, demoRestaurants, demoServiceProviders } from '../../data/demo-data';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;
const isTablet = width >= 768;

// Calculate responsive dimensions
const horizontalPadding = isSmallDevice ? 16 : 20;
const cardSpacing = 12;
const gridSpacing = 8;

// Calculate card widths for 2x2 grids
const quickActionWidth = (width - (horizontalPadding * 2) - gridSpacing) / 2;
const productWidth = (width - (horizontalPadding * 2) - gridSpacing) / 2;

const quickActions = [
  { id: '1', name: 'Rides', icon: 'car', color: '#3B82F6', route: '/rides' },
  { id: '2', name: 'Food', icon: 'restaurant', color: '#10B981', route: '/food' },
  { id: '3', name: 'Services', icon: 'construct', color: '#F59E0B', route: '/services' },
  { id: '4', name: 'Shop', icon: 'storefront', color: '#8B5CF6', route: '/shop' },
];

export default function HomeScreen() {
  const { user, cartItems, shoppingCart } = useApp();
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalShoppingItems = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image 
              source={{ uri: user.avatar }} 
              style={styles.avatar}
            />
            <View style={styles.headerText}>
              <Text style={styles.greeting}>Hello,</Text>
              <Text style={styles.userName}>{user.name.split(' ')[0]}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => router.push('/profile/notifications' as any)}
          >
            <Ionicons name="notifications-outline" size={24} color="#111827" />
            <View style={styles.notificationBadge}>
              <View style={styles.notificationDot} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Location */}
        <TouchableOpacity style={styles.locationCard}>
          <View style={styles.locationIcon}>
            <Ionicons name="location" size={20} color="#3B82F6" />
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Current Location</Text>
            <Text style={styles.locationText} numberOfLines={1}>
              {user.addresses[0].street}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Quick Actions - 2x2 Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[
                  styles.quickActionCard,
                  { width: quickActionWidth, height: quickActionWidth }
                ]}
                onPress={() => router.push(action.route as any)}
                activeOpacity={0.7}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon as any} size={isSmallDevice ? 24 : 28} color="#FFFFFF" />
                </View>
                <Text style={styles.quickActionName}>{action.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Active Orders Banner */}
        {(totalCartItems > 0 || totalShoppingItems > 0) && (
          <View style={styles.section}>
            <TouchableOpacity 
              style={styles.activeOrdersBanner}
              onPress={() => router.push((totalCartItems > 0 ? '/cart/food' : '/cart/shopping') as any)}
            >
              <View style={styles.activeOrdersIcon}>
                <Ionicons name="cart" size={24} color="#3B82F6" />
              </View>
              <View style={styles.activeOrdersInfo}>
                <Text style={styles.activeOrdersTitle}>You have items in cart</Text>
                <Text style={styles.activeOrdersText}>
                  {totalCartItems > 0 && `${totalCartItems} food items`}
                  {totalCartItems > 0 && totalShoppingItems > 0 && ' • '}
                  {totalShoppingItems > 0 && `${totalShoppingItems} shopping items`}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        )}

        {/* Popular Restaurants */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Restaurants</Text>
            <TouchableOpacity onPress={() => router.push('/food' as any)}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {demoRestaurants.slice(0, 3).map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                style={styles.restaurantCard}
                onPress={() => router.push(`/restaurant/${restaurant.id}` as any)}
                activeOpacity={0.7}
              >
                <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName} numberOfLines={1}>
                    {restaurant.name}
                  </Text>
                  <Text style={styles.restaurantCuisine} numberOfLines={1}>
                    {restaurant.cuisine.join(' • ')}
                  </Text>
                  <View style={styles.restaurantMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="star" size={14} color="#F59E0B" />
                      <Text style={styles.metaText}>{restaurant.rating}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="time" size={14} color="#6B7280" />
                      <Text style={styles.metaText}>{restaurant.deliveryTime.split('-')[0]}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Top Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Rated Services</Text>
            <TouchableOpacity onPress={() => router.push('/services' as any)}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {demoServiceProviders.slice(0, 2).map((provider) => (
            <TouchableOpacity
              key={provider.id}
              style={styles.serviceCard}
              onPress={() => router.push('/services' as any)}
              activeOpacity={0.7}
            >
              <View style={styles.serviceAvatar}>
                <Text style={styles.serviceInitial}>{provider.name[0]}</Text>
              </View>
              <View style={styles.serviceInfo}>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceName}>{provider.name}</Text>
                  {provider.isVerified && (
                    <Ionicons name="checkmark-circle" size={16} color="#3B82F6" />
                  )}
                </View>
                <Text style={styles.serviceType}>{provider.services[0]}</Text>
                <View style={styles.serviceMeta}>
                  <Ionicons name="star" size={12} color="#F59E0B" />
                  <Text style={styles.serviceRating}>{provider.rating}</Text>
                  <Text style={styles.serviceExperience}> • {provider.experience}</Text>
                </View>
              </View>
              <View style={styles.serviceRate}>
                <Text style={styles.rateAmount}>${provider.hourlyRate}</Text>
                <Text style={styles.rateUnit}>/hr</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Products - 2x2 Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity onPress={() => router.push('/shop' as any)}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productsGrid}>
            {demoProducts.slice(0, 4).map((product) => (
              <TouchableOpacity
                key={product.id}
                style={[styles.productCard, { width: productWidth }]}
                onPress={() => router.push('/shop' as any)}
                activeOpacity={0.7}
              >
                {product.originalPrice && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Text>
                  </View>
                )}
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <View style={styles.productPricing}>
                    <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                    {product.originalPrice && (
                      <Text style={styles.productOriginalPrice}>
                        ${product.originalPrice.toFixed(2)}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Promotional Banner */}
        <TouchableOpacity style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Special Offer! 🎉</Text>
            <Text style={styles.promoText}>Get 20% off on your first order</Text>
            <View style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Claim Now</Text>
            </View>
          </View>
          <View style={styles.promoIcon}>
            <Ionicons name="gift" size={48} color="#3B82F6" />
          </View>
        </TouchableOpacity>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalPadding,
    paddingVertical: isSmallDevice ? 12 : 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: isSmallDevice ? 40 : 48,
    height: isSmallDevice ? 40 : 48,
    borderRadius: isSmallDevice ? 20 : 24,
    backgroundColor: '#3B82F6',
  },
  headerText: {
    marginLeft: 12,
  },
  greeting: {
    fontSize: isSmallDevice ? 13 : 14,
    color: '#6B7280',
  },
  userName: {
    fontSize: isSmallDevice ? 18 : 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: horizontalPadding,
    marginBottom: isSmallDevice ? 16 : 20,
    padding: isSmallDevice ? 12 : 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  locationText: {
    fontSize: isSmallDevice ? 14 : 15,
    fontWeight: '600',
    color: '#111827',
    marginTop: 2,
  },
  section: {
    paddingHorizontal: horizontalPadding,
    marginBottom: isSmallDevice ? 20 : 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isSmallDevice ? 12 : 16,
  },
  sectionTitle: {
    fontSize: isSmallDevice ? 18 : 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  seeAll: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: isSmallDevice ? 12 : 16,
    marginBottom: gridSpacing,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    width: isSmallDevice ? 56 : 64,
    height: isSmallDevice ? 56 : 64,
    borderRadius: isSmallDevice ? 28 : 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionName: {
    fontSize: isSmallDevice ? 13 : 14,
    fontWeight: '600',
    color: '#111827',
  },
  activeOrdersBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: isSmallDevice ? 12 : 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  activeOrdersIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activeOrdersInfo: {
    flex: 1,
  },
  activeOrdersTitle: {
    fontSize: isSmallDevice ? 14 : 15,
    fontWeight: '600',
    color: '#1E40AF',
  },
  activeOrdersText: {
    fontSize: isSmallDevice ? 12 : 13,
    color: '#3B82F6',
    marginTop: 2,
  },
  horizontalScroll: {
    paddingRight: horizontalPadding,
  },
  restaurantCard: {
    width: isTablet ? 280 : isSmallDevice ? 240 : 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: cardSpacing,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: '100%',
    height: isSmallDevice ? 120 : 140,
  },
  restaurantInfo: {
    padding: 12,
  },
  restaurantName: {
    fontSize: isSmallDevice ? 14 : 15,
    fontWeight: '600',
    color: '#111827',
  },
  restaurantCuisine: {
    fontSize: isSmallDevice ? 12 : 13,
    color: '#6B7280',
    marginTop: 2,
  },
  restaurantMeta: {
    flexDirection: 'row',
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: isSmallDevice ? 12 : 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceAvatar: {
    width: isSmallDevice ? 48 : 56,
    height: isSmallDevice ? 48 : 56,
    borderRadius: isSmallDevice ? 24 : 28,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  serviceInitial: {
    fontSize: isSmallDevice ? 20 : 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: isSmallDevice ? 14 : 15,
    fontWeight: '600',
    color: '#111827',
    marginRight: 4,
  },
  serviceType: {
    fontSize: isSmallDevice ? 12 : 13,
    color: '#6B7280',
    marginTop: 2,
  },
  serviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  serviceRating: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  serviceExperience: {
    fontSize: 12,
    color: '#6B7280',
  },
  serviceRate: {
    alignItems: 'flex-end',
  },
  rateAmount: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  rateUnit: {
    fontSize: 11,
    color: '#6B7280',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: gridSpacing,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 1,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: isSmallDevice ? 100 : 120,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: isSmallDevice ? 12 : 13,
    fontWeight: '600',
    color: '#111827',
    height: isSmallDevice ? 32 : 36,
  },
  productPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  productPrice: {
    fontSize: isSmallDevice ? 13 : 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  productOriginalPrice: {
    fontSize: 11,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  promoBanner: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    marginHorizontal: horizontalPadding,
    padding: isSmallDevice ? 16 : 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#DBEAFE',
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  promoText: {
    fontSize: isSmallDevice ? 13 : 14,
    color: '#3B82F6',
    marginTop: 4,
  },
  promoButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: isSmallDevice ? 16 : 20,
    paddingVertical: isSmallDevice ? 8 : 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  promoButtonText: {
    color: '#FFFFFF',
    fontSize: isSmallDevice ? 13 : 14,
    fontWeight: '600',
  },
  promoIcon: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
});
