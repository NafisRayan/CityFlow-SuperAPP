import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Navigation, Clock, CreditCard, Star, User, Phone } from 'lucide-react-native';

export default function RidesScreen() {
  const [pickupLocation, setPickupLocation] = useState('Current Location');
  const [destination, setDestination] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('standard');
  const [showTracking, setShowTracking] = useState(false);

  const vehicleTypes = [
    { id: 'economy', name: 'Economy', time: '3 min', price: '$8.50', seats: '4' },
    { id: 'standard', name: 'Standard', time: '2 min', price: '$12.30', seats: '4' },
    { id: 'premium', name: 'Premium', time: '5 min', price: '$18.90', seats: '4' },
    { id: 'xl', name: 'XL', time: '4 min', price: '$15.60', seats: '6' },
  ];

  const handleBookRide = () => {
    setShowTracking(true);
  };

  if (showTracking) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.trackingContainer}>
          <View style={styles.mockMap}>
            <Text style={styles.mapText}>🚗 Live Map View</Text>
            <Text style={styles.mapSubtext}>Driver is 2 min away</Text>
          </View>
          
          <View style={styles.trackingCard}>
            <View style={styles.trackingHeader}>
              <Text style={styles.trackingTitle}>Your driver is on the way</Text>
              <Text style={styles.arrivalTime}>Arriving in 2 minutes</Text>
            </View>
            
            <View style={styles.driverInfo}>
              <View style={styles.driverAvatar}>
                <User size={24} color="#FFFFFF" />
              </View>
              <View style={styles.driverDetails}>
                <Text style={styles.driverName}>John Smith</Text>
                <View style={styles.driverRating}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.ratingText}>4.9 (324 reviews)</Text>
                </View>
                <Text style={styles.vehicleInfo}>Honda Civic • ABC-123</Text>
              </View>
              <TouchableOpacity style={styles.contactButton}>
                <Phone size={20} color="#2563EB" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowTracking(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel Ride</Text>
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
          <Text style={styles.title}>Book a Ride</Text>
          <Text style={styles.subtitle}>Where are you going?</Text>
        </View>

        <View style={styles.locationCard}>
          <View style={styles.locationRow}>
            <View style={styles.locationDot} />
            <View style={styles.locationInput}>
              <Text style={styles.locationLabel}>From</Text>
              <TextInput
                style={styles.locationText}
                value={pickupLocation}
                onChangeText={setPickupLocation}
                placeholder="Enter pickup location"
              />
            </View>
            <TouchableOpacity style={styles.currentLocationButton}>
              <Navigation size={16} color="#2563EB" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.locationDivider} />
          
          <View style={styles.locationRow}>
            <View style={[styles.locationDot, styles.destinationDot]} />
            <View style={styles.locationInput}>
              <Text style={styles.locationLabel}>To</Text>
              <TextInput
                style={styles.locationText}
                value={destination}
                onChangeText={setDestination}
                placeholder="Enter destination"
              />
            </View>
            <TouchableOpacity style={styles.mapButton}>
              <MapPin size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Vehicle</Text>
          {vehicleTypes.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              style={[
                styles.vehicleCard,
                selectedVehicle === vehicle.id && styles.selectedVehicle
              ]}
              onPress={() => setSelectedVehicle(vehicle.id)}
            >
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleName}>{vehicle.name}</Text>
                <View style={styles.vehicleDetails}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.vehicleTime}>{vehicle.time}</Text>
                  <Text style={styles.vehicleSeats}>• {vehicle.seats} seats</Text>
                </View>
              </View>
              <Text style={styles.vehiclePrice}>{vehicle.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity style={styles.paymentCard}>
            <View style={styles.paymentIcon}>
              <CreditCard size={20} color="#374151" />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentText}>•••• 4532</Text>
              <Text style={styles.paymentSubtext}>Visa</Text>
            </View>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[
            styles.bookButton,
            (!destination || !pickupLocation) && styles.bookButtonDisabled
          ]}
          onPress={handleBookRide}
          disabled={!destination || !pickupLocation}
        >
          <Text style={styles.bookButtonText}>Book Ride</Text>
        </TouchableOpacity>
      </View>
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
  locationCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2563EB',
    marginRight: 16,
  },
  destinationDot: {
    backgroundColor: '#EF4444',
  },
  locationInput: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  currentLocationButton: {
    padding: 8,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  mapButton: {
    padding: 8,
  },
  locationDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginLeft: 28,
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
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedVehicle: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  vehicleDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  vehicleTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  vehicleSeats: {
    fontSize: 14,
    color: '#6B7280',
  },
  vehiclePrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  paymentSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  changeText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  bottomSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  bookButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  trackingContainer: {
    flex: 1,
  },
  mockMap: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 16,
    color: '#6B7280',
  },
  trackingCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  trackingHeader: {
    marginBottom: 20,
    alignItems: 'center',
  },
  trackingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  arrivalTime: {
    fontSize: 16,
    color: '#16A34A',
    fontWeight: '600',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  driverAvatar: {
    width: 60,
    height: 60,
    backgroundColor: '#2563EB',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  vehicleInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
  contactButton: {
    width: 44,
    height: 44,
    backgroundColor: '#EFF6FF',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '600',
  },
});