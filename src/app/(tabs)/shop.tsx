import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../contexts/app-context';
import { demoProducts, demoStores } from '../../data/demo-data';

const categories = ['All', 'Groceries', 'Electronics', 'Fashion', 'Home', 'Beauty'];

export default function ShopScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { shoppingCart, addToShoppingCart, user } = useApp();

  const filteredProducts = demoProducts.filter(product => {
    const matchesSearch = searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' ||
      product.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  const totalCartItems = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: typeof demoProducts[0]) => {
    addToShoppingCart({ ...product, quantity: 1 });
    Alert.alert('Added to Cart', `${product.name} added to your cart`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Shop Local</Text>
            <TouchableOpacity style={styles.locationButton}>
              <Text style={styles.location}>{user.addresses[0].street}</Text>
              <Ionicons name="chevron-down" size={18} color="#111827" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => router.push('/cart/shopping')}
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
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products or stores..."
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

        {/* Stores */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Stores</Text>
            <TouchableOpacity onPress={() => Alert.alert('Stores', 'View all stores')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {demoStores.map((store) => (
              <TouchableOpacity 
                key={store.id} 
                style={styles.storeCard}
                onPress={() => Alert.alert(store.name, 'Store details coming soon!')}
              >
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
            <Text style={styles.sectionTitle}>
              {searchQuery ? 'Search Results' : 'Deals for You'}
            </Text>
            <Text style={styles.resultCount}>
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </Text>
          </View>
          
          {filteredProducts.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="storefront-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyText}>No products found</Text>
              <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
            </View>
          ) : (
            <View style={styles.productsGrid}>
              {filteredProducts.map((product) => {
                const cartItem = shoppingCart.find(item => item.id === product.id);
                const inCart = !!cartItem;

                return (
                  <TouchableOpacity 
                    key={product.id} 
                    style={styles.productCard}
                    onPress={() => Alert.alert(product.name, product.description)}
                  >
                    {product.originalPrice && (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </Text>
                      </View>
                    )}
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                    <View style={styles.productInfo}>
                      <Text style={styles.productName} numberOfLines={2}>
                        {product.name}
                      </Text>
                      <Text style={styles.productStore}>
                        {demoStores.find(s => s.id === product.storeId)?.name}
                      </Text>
                      <View style={styles.productPricing}>
                        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                        {product.originalPrice && (
                          <Text style={styles.productOriginalPrice}>
                            ${product.originalPrice.toFixed(2)}
                          </Text>
                        )}
                      </View>
                      <View style={styles.productFooter}>
                        <View style={styles.productRating}>
                          <Ionicons name="star" size={12} color="#F59E0B" />
                          <Text style={styles.ratingText}>{product.rating}</Text>
                        </View>
                        <TouchableOpacity
                          style={[styles.addToCartButton, inCart && styles.addToCartButtonAdded]}
                          onPress={() => handleAddToCart(product)}
                        >
                          <Ionicons 
                            name={inCart ? "checkmark" : "add"} 
                            size={16} 
                            color="#FFFFFF" 
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
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
  searchBar: {
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  addToCartButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButtonAdded: {
    backgroundColor: '#10B981',
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
