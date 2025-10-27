import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const featuredProviders = [
  {
    id: '1',
    name: 'John Smith',
    service: 'Plumbing',
    rating: 4.9,
    reviews: 234,
    experience: '8 years',
    rate: 45,
    isVerified: true,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    service: 'Cleaning',
    rating: 4.8,
    reviews: 189,
    experience: '5 years',
    rate: 35,
    isVerified: true,
  },
  {
    id: '3',
    name: 'Mike Wilson',
    service: 'Electrical',
    rating: 4.7,
    reviews: 156,
    experience: '10 years',
    rate: 50,
    isVerified: true,
  },
];

export default function ServicesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Home Services</Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <Text style={styles.searchPlaceholder}>Search for services...</Text>
        </TouchableOpacity>

        {/* Service Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {serviceCategories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
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
            <Text style={styles.sectionTitle}>Top Rated Providers</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {featuredProviders.map((provider) => (
            <TouchableOpacity key={provider.id} style={styles.providerCard}>
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
                <Text style={styles.providerService}>{provider.service}</Text>
                <View style={styles.providerMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="star" size={14} color="#F59E0B" />
                    <Text style={styles.metaText}>
                      {provider.rating} ({provider.reviews})
                    </Text>
                  </View>
                  <Text style={styles.metaDivider}>•</Text>
                  <Text style={styles.metaText}>{provider.experience}</Text>
                </View>
              </View>
              <View style={styles.providerRate}>
                <Text style={styles.rateAmount}>${provider.rate}</Text>
                <Text style={styles.rateUnit}>/hour</Text>
              </View>
            </TouchableOpacity>
          ))}
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
  },
  searchPlaceholder: {
    marginLeft: 8,
    fontSize: 16,
    color: '#9CA3AF',
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 16,
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
  },
  providerCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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
});
