import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { demoServiceProviders } from '../../data/demo-data';

const serviceCategories = [
  { id: '1', name: 'Cleaning', icon: 'sparkles', color: '#3B82F6' },
  { id: '2', name: 'Plumbing', icon: 'water', color: '#10B981' },
  { id: '3', name: 'Electrical', icon: 'flash', color: '#F59E0B' },
  { id: '4', name: 'Carpentry', icon: 'hammer', color: '#8B5CF6' },
  { id: '5', name: 'Painting', icon: 'color-palette', color: '#EC4899' },
  { id: '6', name: 'AC Repair', icon: 'snow', color: '#06B6D4' },
  { id: '7', name: 'Beauty', icon: 'cut', color: '#F43F5E' },
  { id: '8', name: 'Pest Control', icon: 'bug', color: '#84CC16' },
];

export default function ServicesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProviders = demoServiceProviders.filter(provider => {
    const matchesSearch = searchQuery === '' ||
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory ||
      provider.services.some(s => s.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  const handleCategoryPress = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryName);
    }
  };

  const handleBookService = (provider: typeof demoServiceProviders[0]) => {
    Alert.alert(
      'Book Service',
      `Book ${provider.services[0]} with ${provider.name}?\n\nRate: $${provider.hourlyRate}/hour`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          onPress: () => {
            Alert.alert('Success', 'Booking request sent! Provider will contact you soon.');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Home Services</Text>
          <TouchableOpacity onPress={() => Alert.alert('Notifications', 'No new notifications')}>
            <Ionicons name="notifications-outline" size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for services..."
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

        {/* Service Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {serviceCategories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={[
                  styles.categoryCard,
                  selectedCategory === category.name && styles.categoryCardSelected
                ]}
                onPress={() => handleCategoryPress(category.name)}
                activeOpacity={0.7}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <Ionicons name={category.icon as any} size={28} color={category.color} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Providers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory ? `${selectedCategory} Providers` : 'Top Rated Providers'}
            </Text>
            <Text style={styles.resultCount}>
              {filteredProviders.length} {filteredProviders.length === 1 ? 'provider' : 'providers'}
            </Text>
          </View>
          
          {filteredProviders.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="construct-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyText}>No providers found</Text>
              <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
            </View>
          ) : (
            filteredProviders.map((provider) => (
              <View key={provider.id} style={styles.providerCard}>
                <View style={styles.providerAvatar}>
                  <Text style={styles.providerInitial}>{provider.name[0]}</Text>
                </View>
                <View style={styles.providerInfo}>
                  <View style={styles.providerHeader}>
                    <Text style={styles.providerName}>{provider.name}</Text>
                    {provider.isVerified && (
                      <Ionicons name="checkmark-circle" size={18} color="#3B82F6" />
                    )}
                  </View>
                  <Text style={styles.providerService}>{provider.services[0]}</Text>
                  <View style={styles.providerMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="star" size={14} color="#F59E0B" />
                      <Text style={styles.metaText}>
                        {provider.rating} ({provider.reviewCount})
                      </Text>
                    </View>
                    <Text style={styles.metaDivider}>•</Text>
                    <Text style={styles.metaText}>{provider.experience}</Text>
                  </View>
                  <View style={styles.availabilityContainer}>
                    <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                    <Text style={styles.availabilityText}>
                      Available: {provider.availability.join(', ')}
                    </Text>
                  </View>
                </View>
                <View style={styles.providerActions}>
                  <View style={styles.providerRate}>
                    <Text style={styles.rateAmount}>${provider.hourlyRate}</Text>
                    <Text style={styles.rateUnit}>/hour</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.bookButton}
                    onPress={() => handleBookService(provider)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.bookButtonText}>Book</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Emergency Services Banner */}
        <TouchableOpacity 
          style={styles.emergencyBanner}
          onPress={() => Alert.alert('Emergency Services', '24/7 emergency services available. Call now!')}
        >
          <View style={styles.emergencyIcon}>
            <Ionicons name="alert-circle" size={24} color="#EF4444" />
          </View>
          <View style={styles.emergencyInfo}>
            <Text style={styles.emergencyTitle}>Need Emergency Service?</Text>
            <Text style={styles.emergencyText}>24/7 support available</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#EF4444" />
        </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  categoryCardSelected: {
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#111827',
    textAlign: 'center',
    fontWeight: '500',
  },
  providerCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  providerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  providerInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  providerInfo: {
    flex: 1,
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginRight: 4,
  },
  providerService: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  providerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  metaDivider: {
    marginHorizontal: 8,
    color: '#D1D5DB',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  availabilityText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  providerActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  providerRate: {
    alignItems: 'flex-end',
  },
  rateAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  rateUnit: {
    fontSize: 12,
    color: '#6B7280',
  },
  bookButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emergencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  emergencyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emergencyInfo: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  emergencyText: {
    fontSize: 14,
    color: '#991B1B',
    marginTop: 2,
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
