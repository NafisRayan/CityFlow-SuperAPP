import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = ['All', 'Groceries', 'Electronics', 'Fashion', 'Home', 'Beauty'];

const stores = [
  {
    id: '1',
    name: 'Fresh Market',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200',
    category: 'Groceries',
    rating: 4.6,
    deliveryTime: '30-45 min',
  },
  {
    id: '2',
    name: 'Tech Hub',
    logo: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200',
    category: 'Electronics',
    rating: 4.8,
    deliveryTime: '1-2 hours',
  },
];

const products = [
  {
    id: '1',
    name: 'Fresh Organic Apples',
    price: 4.99,
    originalPrice: 6.99,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300',
    store: 'Fresh Market',
    rating: 4.5,
    discount: 30,
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    store: 'Tech Hub',
    rating: 4.7,
    discount: 20,
  },
  {
    id: '3',
    name: 'Cotton T-Shirt',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
    store: 'Fashion Store',
    rating: 4.4,
  },
];

export default function ShopScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Shop Local</Text>
            <TouchableOpacity style={styles.locationButton}>
              <Text style={styles.location}>123 Main St</Text>
              <Ionicons name="chevron-down" size={18} color="#111827" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart" size={24} color="#111827" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>5</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <Text style={styles.searchPlaceholder}>Search products or stores...</Text>
        </TouchableOpacity>

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

        {/* Stores */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Stores</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {stores.map((store) => (
              <TouchableOpacity key={store.id} style={styles.storeCard}>
                <Image source={{ uri: store.logo }} style={styles.storeLogo} />
                <Text style={styles.storeName}>{store.name}</Text>
                <Text style={styles.storeCategory}>{store.category}</Text>
                <View style={styles.storeMeta}>
                  <Ionicons name="star" size={14} color="#F59E0B" />
                  <Text style={styles.storeRating}>{store.rating}</Text>
                  <Text style={styles.storeDelivery}> • {store.deliveryTime}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Deals for You</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productsGrid}>
            {products.map((product) => (
              <TouchableOpacity key={product.id} style={styles.productCard}>
                {product.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{product.discount}% OFF</Text>
                  </View>
                )}
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <Text style={styles.productStore}>{product.store}</Text>
                  <View style={styles.productPricing}>
                    <Text style={styles.productPrice}>${product.price}</Text>
                    {product.originalPrice && (
                      <Text style={styles.productOriginalPrice}>
                        ${product.originalPrice}
                      </Text>
                    )}
                  </View>
                  <View style={styles.productRating}>
                    <Ionicons name="star" size={12} color="#F59E0B" />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 12,
    borderRadius: 12,
  },
  searchPlaceholder: {
    marginLeft: 8,
    fontSize: 16,
    color: '#9CA3AF',
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
  seeAll: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  storeCard: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
  },
  storeLogo: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  storeCategory: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  storeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  storeRating: {
    fontSize: 12,
    color: '#111827',
    marginLeft: 4,
  },
  storeDelivery: {
    fontSize: 12,
    color: '#6B7280',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
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
    height: 140,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    height: 36,
  },
  productStore: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  productPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  productOriginalPrice: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
});
