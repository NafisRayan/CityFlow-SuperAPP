import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../contexts/app-context';
import { demoRestaurants } from '../../data/demo-data';

const categories = ['All', 'Pizza', 'Burgers', 'Asian', 'Mexican', 'Desserts', 'Healthy'];

export default function FoodScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems, user } = useApp();

  const filteredRestaurants = demoRestaurants.filter(restaurant => {
    const matchesSearch = searchQuery === '' || 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || 
      restaurant.cuisine.some(c => c.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Deliver to</Text>
            <TouchableOpacity style={styles.locationButton}>
              <Text style={styles.location}>{user.addresses[0].street}</Text>
              <Ionicons name="chevron-down" size={20} color="#111827" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => router.push('/cart/food')}
          >
            <Ionicons name="cart" size={24} color="#111827" />
            {totalCartItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalCartItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for restaurants or dishes"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
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

        {/* Restaurants */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {searchQuery ? 'Search Results' : 'Popular Restaurants'}
            </Text>
            <Text style={styles.resultCount}>
              {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'}
            </Text>
          </View>
          
          {filteredRestaurants.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="restaurant-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyText}>No restaurants found</Text>
              <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
            </View>
          ) : (
            filteredRestaurants.map((restaurant) => (
              <TouchableOpacity 
                key={restaurant.id} 
                style={styles.restaurantCard}
                onPress={() => router.push(`/restaurant/${restaurant.id}`)}
                activeOpacity={0.7}
              >
                <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
                {!restaurant.isOpen && (
                  <View style={styles.closedOverlay}>
                    <Text style={styles.closedText}>Closed</Text>
                  </View>
                )}
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <Text style={styles.restaurantCuisine}>
                    {restaurant.cuisine.join(' • ')}
                  </Text>
                  <View style={styles.restaurantMeta}>
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
                      <Text style={styles.badgeText}>{restaurant.distance} km</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#6B7280',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginRight: 4,
  },
  cartButton: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#111827',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
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
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  resultCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  restaurantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: '100%',
    height: 160,
  },
  closedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 160,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  restaurantInfo: {
    padding: 12,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  restaurantCuisine: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  restaurantMeta: {
    flexDirection: 'row',
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
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
    marginTop: 8,
  },
  badge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
});
