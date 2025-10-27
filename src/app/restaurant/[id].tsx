import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../contexts/app-context';
import { demoRestaurants } from '../../data/demo-data';

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams();
  const restaurant = demoRestaurants.find(r => r.id === id);
  const { cartItems, addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Restaurant not found</Text>
      </SafeAreaView>
    );
  }

  const categories = ['All', ...Array.from(new Set(restaurant.menu.map(item => item.category)))];
  const filteredMenu = selectedCategory === 'All' 
    ? restaurant.menu 
    : restaurant.menu.filter(item => item.category === selectedCategory);

  const restaurantCartItems = cartItems.filter(item => 
    restaurant.menu.some(menuItem => menuItem.id === item.id)
  );
  const cartTotal = restaurantCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: restaurant.image }} style={styles.headerImage} />
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Restaurant Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.cuisine}>{restaurant.cuisine.join(' • ')}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text style={styles.metaText}>{restaurant.rating}</Text>
              <Text style={styles.metaSubtext}>({restaurant.reviewCount})</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time" size={16} color="#6B7280" />
              <Text style={styles.metaText}>{restaurant.deliveryTime}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="bicycle" size={16} color="#6B7280" />
              <Text style={styles.metaText}>${restaurant.deliveryFee}</Text>
            </View>
          </View>

          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Min ${restaurant.minimumOrder}</Text>
            </View>
            <View style={[styles.badge, styles.badgeSuccess]}>
              <Text style={styles.badgeText}>{restaurant.distance} km away</Text>
            </View>
          </View>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipSelected,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextSelected,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {filteredMenu.map((item) => {
            const cartItem = cartItems.find(ci => ci.id === item.id);
            const quantity = cartItem?.quantity || 0;

            return (
              <View key={item.id} style={styles.menuItem}>
                <Image source={{ uri: item.image }} style={styles.menuImage} />
                <View style={styles.menuInfo}>
                  <View style={styles.menuHeader}>
                    <Text style={styles.menuName}>{item.name}</Text>
                    {item.isPopular && (
                      <View style={styles.popularBadge}>
                        <Ionicons name="flame" size={12} color="#EF4444" />
                        <Text style={styles.popularText}>Popular</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.menuDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View style={styles.menuFooter}>
                    <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
                    {item.isVegetarian && (
                      <View style={styles.vegBadge}>
                        <Text style={styles.vegText}>🌱 Veg</Text>
                      </View>
                    )}
                  </View>
                </View>
                {quantity > 0 ? (
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => addToCart({ ...item, quantity: -1 })}
                    >
                      <Ionicons name="remove" size={20} color="#3B82F6" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => addToCart({ ...item, quantity: 1 })}
                    >
                      <Ionicons name="add" size={20} color="#3B82F6" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addToCart({ ...item, quantity: 1 })}
                  >
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Cart Footer */}
      {restaurantCartItems.length > 0 && (
        <View style={styles.cartFooter}>
          <View style={styles.cartInfo}>
            <Text style={styles.cartItems}>{restaurantCartItems.length} items</Text>
            <Text style={styles.cartTotal}>${cartTotal.toFixed(2)}</Text>
          </View>
          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={() => router.push('/checkout/food')}
          >
            <Text style={styles.checkoutText}>View Cart</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  imageContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 250,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  cuisine: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    fontSize: 14,
    color: '#111827',
    marginLeft: 4,
  },
  metaSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 2,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  badge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeSuccess: {
    backgroundColor: '#ECFDF5',
  },
  badgeText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#3B82F6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  menuImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  menuInfo: {
    flex: 1,
    marginLeft: 12,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  popularText: {
    fontSize: 10,
    color: '#EF4444',
    marginLeft: 2,
    fontWeight: '600',
  },
  menuDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  menuFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  vegBadge: {
    marginLeft: 8,
  },
  vegText: {
    fontSize: 12,
    color: '#10B981',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginHorizontal: 12,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cartFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cartInfo: {
    flex: 1,
  },
  cartItems: {
    fontSize: 14,
    color: '#6B7280',
  },
  cartTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});
