import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../contexts/app-context';

const rideTypes = [
  { id: 'economy', name: 'Economy', icon: 'car', price: 12, time: '3 min', capacity: 4, description: 'Affordable rides' },
  { id: 'comfort', name: 'Comfort', icon: 'car-sport', price: 18, time: '5 min', capacity: 4, description: 'More space & comfort' },
  { id: 'premium', name: 'Premium', icon: 'diamond', price: 28, time: '8 min', capacity: 4, description: 'Luxury vehicles' },
  { id: 'xl', name: 'XL', icon: 'bus', price: 22, time: '6 min', capacity: 6, description: 'Extra space for groups' },
];

export default function RidesScreen() {
  const { user } = useApp();
  const [selectedRide, setSelectedRide] = useState('economy');
  const [pickup, setPickup] = useState(user.addresses[0].street);
  const [dropoff, setDropoff] = useState('');
  const [showPickupInput, setShowPickupInput] = useState(false);
  const [showDropoffInput, setShowDropoffInput] = useState(false);

  const selectedRideType = rideTypes.find(r => r.id === selectedRide);

  const handleRequestRide = () => {
    if (!dropoff) {
      Alert.alert('Missing Information', 'Please enter your destination');
      return;
    }

    Alert.alert(
      'Confirm Ride',
      `Request ${selectedRideType?.name} ride to ${dropoff}?\n\nEstimated fare: $${selectedRideType?.price}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert(
              'Ride Requested!',
              'Finding a driver near you...',
              [
                {
                  text: 'OK',
                  onPress: () => router.push('/ride/tracking')
                }
              ]
            );
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
          <Text style={styles.title}>Book a Ride</Text>
          <TouchableOpacity onPress={() => Alert.alert('Schedule', 'Schedule ride feature coming soon!')}>
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
            {showPickupInput ? (
              <View style={styles.locationInputWrapper}>
                <Ionicons name="location" size={20} color="#10B981" />
                <TextInput
                  style={styles.locationTextInput}
                  value={pickup}
                  onChangeText={setPickup}
                  placeholder="Enter pickup location"
                  onBlur={() => setShowPickupInput(false)}
                  autoFocus
                />
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.locationInput}
                onPress={() => setShowPickupInput(true)}
              >
                <Ionicons name="location" size={20} color="#10B981" />
                <Text style={styles.locationText}>{pickup}</Text>
              </TouchableOpacity>
            )}
            
            {showDropoffInput ? (
              <View style={styles.locationInputWrapper}>
                <Ionicons name="location" size={20} color="#EF4444" />
                <TextInput
                  style={styles.locationTextInput}
                  value={dropoff}
                  onChangeText={setDropoff}
                  placeholder="Where to?"
                  onBlur={() => setShowDropoffInput(false)}
                  autoFocus
                />
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.locationInput}
                onPress={() => setShowDropoffInput(true)}
              >
                <Ionicons name="location" size={20} color="#EF4444" />
                <Text style={[styles.locationText, !dropoff && styles.placeholder]}>
                  {dropoff || 'Where to?'}
                </Text>
              </TouchableOpacity>
            )}
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
              activeOpacity={0.7}
            >
              <View style={styles.rideIcon}>
                <Ionicons name={ride.icon as any} size={28} color="#3B82F6" />
              </View>
              <View style={styles.rideInfo}>
                <Text style={styles.rideName}>{ride.name}</Text>
                <Text style={styles.rideDescription}>{ride.description}</Text>
                <Text style={styles.rideDetails}>
                  {ride.time} away • {ride.capacity} seats
                </Text>
              </View>
              <Text style={styles.ridePrice}>${ride.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Method */}
        <TouchableOpacity 
          style={styles.paymentCard}
          onPress={() => Alert.alert('Payment', 'Change payment method feature coming soon!')}
        >
          <Ionicons name="card" size={24} color="#3B82F6" />
          <Text style={styles.paymentText}>
            {user.paymentMethods[0].label} •••• {user.paymentMethods[0].last4}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Promo Code */}
        <TouchableOpacity 
          style={styles.promoCard}
          onPress={() => Alert.alert('Promo Code', 'Enter promo code feature coming soon!')}
        >
          <Ionicons name="pricetag" size={24} color="#10B981" />
          <Text style={styles.promoText}>Add promo code</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Book Button */}
        <TouchableOpacity 
          style={[styles.bookButton, !dropoff && styles.bookButtonDisabled]}
          onPress={handleRequestRide}
          disabled={!dropoff}
          activeOpacity={0.7}
        >
          <Text style={styles.bookButtonText}>Request Ride</Text>
        </TouchableOpacity>

        {/* Recent Rides */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Rides</Text>
          <TouchableOpacity 
            style={styles.recentRide}
            onPress={() => Alert.alert('Recent Ride', 'View ride details')}
          >
            <View style={styles.recentIcon}>
              <Ionicons name="time-outline" size={20} color="#6B7280" />
            </View>
            <View style={styles.recentInfo}>
              <Text style={styles.recentAddress}>456 Market Street</Text>
              <Text style={styles.recentTime}>2 days ago</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
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
  locationInputWrapper: {
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
    flex: 1,
  },
  locationTextInput: {
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
    flex: 1,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  rideCardSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
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
  rideDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  rideDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
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
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  promoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  promoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#10B981',
    fontWeight: '600',
  },
  bookButton: {
    backgroundColor: '#3B82F6',
    margin: 16,
    marginTop: 0,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  bookButtonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recentRide: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recentInfo: {
    flex: 1,
  },
  recentAddress: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  recentTime: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});
