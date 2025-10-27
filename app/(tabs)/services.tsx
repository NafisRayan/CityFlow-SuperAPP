import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Star, Clock, MapPin, Wrench, Hop as Home, Scissors, Car, Calendar, Check } from 'lucide-react-native';

export default function ServicesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const categories = [
    { id: 'all', name: 'All', icon: Home },
    { id: 'cleaning', name: 'Cleaning', icon: Home },
    { id: 'repair', name: 'Repair', icon: Wrench },
    { id: 'beauty', name: 'Beauty', icon: Scissors },
    { id: 'automotive', name: 'Auto', icon: Car },
  ];

  const services = [
    {
      id: 1,
      name: 'House Cleaning Service',
      category: 'cleaning',
      provider: 'CleanPro',
      rating: 4.8,
      reviews: 234,
      price: 45,
      duration: '2-3 hours',
      description: 'Professional deep cleaning for your entire home',
      image: '🏠',
      available: true,
    },
    {
      id: 2,
      name: 'Plumbing Repair',
      category: 'repair',
      provider: 'FixIt Now',
      rating: 4.9,
      reviews: 189,
      price: 75,
      duration: '1-2 hours',
      description: 'Emergency plumbing repairs and installations',
      image: '🔧',
      available: true,
    },
    {
      id: 3,
      name: 'Hair & Makeup',
      category: 'beauty',
      provider: 'Bella Beauty',
      rating: 4.7,
      reviews: 156,
      price: 85,
      duration: '2 hours',
      description: 'Professional hair styling and makeup at your home',
      image: '💄',
      available: false,
    },
    {
      id: 4,
      name: 'AC Installation',
      category: 'repair',
      provider: 'Cool Tech',
      rating: 4.6,
      reviews: 98,
      price: 150,
      duration: '3-4 hours',
      description: 'Air conditioning installation and maintenance',
      image: '❄️',
      available: true,
    },
  ];

  const filteredServices = services.filter(service => 
    (selectedCategory === 'all' || service.category === selectedCategory) &&
    (searchQuery === '' || service.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleBookService = (service) => {
    setSelectedService(service);
    setShowBooking(true);
  };

  if (showBooking && selectedService) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.bookingContainer}>
          <View style={styles.bookingHeader}>
            <TouchableOpacity onPress={() => setShowBooking(false)}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.bookingTitle}>Book Service</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.servicePreview}>
              <Text style={styles.serviceEmoji}>{selectedService.image}</Text>
              <View style={styles.servicePreviewInfo}>
                <Text style={styles.servicePreviewName}>{selectedService.name}</Text>
                <Text style={styles.servicePreviewProvider}>{selectedService.provider}</Text>
                <Text style={styles.servicePreviewPrice}>${selectedService.price}/service</Text>
              </View>
            </View>

            <View style={styles.bookingSection}>
              <Text style={styles.bookingSectionTitle}>Select Date</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
                {Array.from({ length: 7 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() + i);
                  return (
                    <TouchableOpacity key={i} style={styles.dateCard}>
                      <Text style={styles.dateDay}>{date.toLocaleDateString('en', { weekday: 'short' })}</Text>
                      <Text style={styles.dateNumber}>{date.getDate()}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.bookingSection}>
              <Text style={styles.bookingSectionTitle}>Select Time</Text>
              <View style={styles.timeSlotGrid}>
                {timeSlots.map((time) => (
                  <TouchableOpacity key={time} style={styles.timeSlot}>
                    <Text style={styles.timeSlotText}>{time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.bookingSection}>
              <Text style={styles.bookingSectionTitle}>Service Address</Text>
              <View style={styles.addressCard}>
                <MapPin size={20} color="#6B7280" />
                <View style={styles.addressInfo}>
                  <Text style={styles.addressText}>123 Main Street</Text>
                  <Text style={styles.addressSubtext}>Apartment 4B, Downtown</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bookingSection}>
              <Text style={styles.bookingSectionTitle}>Special Instructions</Text>
              <TextInput
                style={styles.instructionsInput}
                placeholder="Any special requests or instructions..."
                multiline
                numberOfLines={3}
              />
            </View>
          </ScrollView>

          <View style={styles.bookingFooter}>
            <TouchableOpacity style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Confirm Booking - ${selectedService.price}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Home Services</Text>
          <Text style={styles.subtitle}>Professional services at your doorstep</Text>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search services"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <category.icon size={24} color={selectedCategory === category.id ? '#7C3AED' : '#6B7280'} />
                <Text style={[
                  styles.categoryName,
                  selectedCategory === category.id && styles.selectedCategoryName
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Services</Text>
          {filteredServices.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceEmoji}>{service.image}</Text>
                <View style={styles.serviceInfo}>
                  <View style={styles.serviceMainInfo}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.serviceProvider}>{service.provider}</Text>
                  </View>
                  <View style={styles.serviceRating}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.ratingText}>{service.rating}</Text>
                    <Text style={styles.reviewCount}>({service.reviews})</Text>
                  </View>
                </View>
              </View>
              
              <Text style={styles.serviceDescription}>{service.description}</Text>
              
              <View style={styles.serviceMeta}>
                <View style={styles.serviceMetaItem}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.serviceMetaText}>{service.duration}</Text>
                </View>
                <Text style={styles.servicePrice}>${service.price}</Text>
              </View>
              
              <TouchableOpacity
                style={[
                  styles.bookButton,
                  !service.available && styles.bookButtonDisabled
                ]}
                onPress={() => handleBookService(service)}
                disabled={!service.available}
              >
                <Text style={styles.bookButtonText}>
                  {service.available ? 'Book Now' : 'Not Available'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us</Text>
          <View style={styles.featureCard}>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Check size={16} color="#16A34A" />
              </View>
              <Text style={styles.featureText}>Verified professionals</Text>
            </View>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Check size={16} color="#16A34A" />
              </View>
              <Text style={styles.featureText}>Same-day booking available</Text>
            </View>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Check size={16} color="#16A34A" />
              </View>
              <Text style={styles.featureText}>100% satisfaction guarantee</Text>
            </View>
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
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  categoryScroll: {
    paddingLeft: 20,
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 80,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCategory: {
    borderColor: '#7C3AED',
    backgroundColor: '#F3E8FF',
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  selectedCategoryName: {
    color: '#7C3AED',
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceMainInfo: {
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  serviceProvider: {
    fontSize: 14,
    color: '#6B7280',
  },
  serviceRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  reviewCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  serviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  serviceMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  serviceMetaText: {
    fontSize: 14,
    color: '#6B7280',
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7C3AED',
  },
  bookButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#DCFCE7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  bookingContainer: {
    flex: 1,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    fontSize: 16,
    color: '#7C3AED',
    fontWeight: '600',
    marginRight: 20,
  },
  bookingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  servicePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  servicePreviewInfo: {
    flex: 1,
    marginLeft: 16,
  },
  servicePreviewName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  servicePreviewProvider: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  servicePreviewPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7C3AED',
  },
  bookingSection: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  bookingSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  dateScroll: {
    flexDirection: 'row',
  },
  dateCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  dateDay: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  dateNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
  timeSlotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  addressInfo: {
    flex: 1,
    marginLeft: 12,
  },
  addressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  addressSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  changeText: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '600',
  },
  instructionsInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  bookingFooter: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  confirmButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});