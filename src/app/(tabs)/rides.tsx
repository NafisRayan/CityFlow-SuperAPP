import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const rideTypes = [
  { id: 'economy', name: 'Economy', icon: 'car', price: 12, time: '3 min', capacity: 4 },
  { id: 'comfort', name: 'Comfort', icon: 'car-sport', price: 18, time: '5 min', capacity: 4 },
  { id: 'premium', name: 'Premium', icon: 'diamond', price: 28, time: '8 min', capacity: 4 },
  { id: 'xl', name: 'XL', icon: 'bus', price: 22, time: '6 min', capacity: 6 },
];

export default function RidesScreen() {
  const [selectedRide, setSelectedRide] = useState('economy');
  const [pickup, setPickup] = useState('Current Location');
  const [dropoff, setDropoff] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Book a Ride</Text>
          <TouchableOpacity>
            <Ionicons name="time-outline" size={24} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* Location Inputs */}
        <View style={styles.locationContainer}>
          <View style={styles.locationDots}>
            <View style={styles.pickupDot} />
            <View style={styles.line} />
            <View style={styles.dropoffDot} />
          </View>
          
          <View style={styles.locationInputs}>
            <TouchableOpacity style={styles.locationInput}>
              <Ionicons name="location" size={20} color="#10B981" />
              <Text style={styles.locationText}>{pickup}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.locationInput}>
              <Ionicons name="location" size={20} color="#EF4444" />
              <Text style={[styles.locationText, !dropoff && styles.placeholder]}>
                {dropoff || 'Where to?'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ride Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose a ride</Text>
          {rideTypes.map((ride) => (
            <TouchableOpacity
              key={ride.id}
              style={[
                styles.rideCard,
                selectedRide === ride.id && styles.rideCardSelected,
              ]}
              onPress={() => setSelectedRide(ride.id)}
            >
              <View style={styles.rideIcon}>
                <Ionicons name={ride.icon as any} size={28} color="#3B82F6" />
              </View>
              <View style={styles.rideInfo}>
                <Text style={styles.rideName}>{ride.name}</Text>
                <Text style={styles.rideDetails}>
                  {ride.time} away • {ride.capacity} seats
                </Text>
              </View>
              <Text style={styles.ridePrice}>${ride.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Method */}
        <TouchableOpacity style={styles.paymentCard}>
          <Ionicons name="card" size={24} color="#3B82F6" />
          <Text style={styles.paymentText}>Visa •••• 4242</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Request Ride</Text>
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
  locationContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationDots: {
    alignItems: 'center',
    marginRight: 12,
    paddingTop: 8,
  },
  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
  },
  line: {
    width: 2,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  dropoffDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
  },
  locationInputs: {
    flex: 1,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  locationText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  placeholder: {
    color: '#9CA3AF',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  rideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  rideCardSelected: {
    borderColor: '#3B82F6',
  },
  rideIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rideInfo: {
    flex: 1,
  },
  rideName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  rideDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  ridePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  paymentText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  bookButton: {
    backgroundColor: '#3B82F6',
    margin: 16,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
