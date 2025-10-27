import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Car, UtensilsCrossed, Wrench, ShoppingBag, Bell, User, MapPin, Clock } from 'lucide-react-native';

export default function HomeScreen() {
  const quickActions = [
    { icon: Car, title: 'Book Ride', subtitle: 'Get there fast', color: '#2563EB', tab: 'rides' },
    { icon: UtensilsCrossed, title: 'Order Food', subtitle: 'Hungry? We deliver', color: '#EA580C', tab: 'food' },
    { icon: Wrench, title: 'Home Services', subtitle: 'Fix, clean, beautify', color: '#7C3AED', tab: 'services' },
    { icon: ShoppingBag, title: 'Local Shop', subtitle: 'Same-day delivery', color: '#16A34A', tab: 'shop' },
  ];

  const recentOrders = [
    { id: 1, type: 'ride', title: 'Trip to Downtown', subtitle: '15 min ago', status: 'Completed', color: '#2563EB' },
    { id: 2, type: 'food', title: 'Italian Bistro', subtitle: 'Yesterday', status: 'Delivered', color: '#EA580C' },
    { id: 3, type: 'service', title: 'House Cleaning', subtitle: '2 days ago', status: 'Completed', color: '#7C3AED' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>Sarah! 👋</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={24} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <User size={24} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationCard}>
          <MapPin size={20} color="#6B7280" />
          <Text style={styles.locationText}>123 Main Street, Downtown</Text>
          <TouchableOpacity>
            <Text style={styles.changeLocation}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What do you need?</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickActionCard}>
                <LinearGradient
                  colors={[action.color, `${action.color}E0`]}
                  style={styles.quickActionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <action.icon size={32} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentOrders.map((order) => (
            <TouchableOpacity key={order.id} style={styles.orderCard}>
              <View style={[styles.orderIcon, { backgroundColor: `${order.color}20` }]}>
                <View style={[styles.orderIconInner, { backgroundColor: order.color }]} />
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderTitle}>{order.title}</Text>
                <View style={styles.orderMeta}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.orderTime}>{order.subtitle}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${order.color}20` }]}>
                <Text style={[styles.statusText, { color: order.color }]}>{order.status}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Promotions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promoScroll}>
            <LinearGradient
              colors={['#3B82F6', '#1D4ED8']}
              style={styles.promoCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.promoTitle}>50% OFF</Text>
              <Text style={styles.promoSubtitle}>First ride today</Text>
            </LinearGradient>
            <LinearGradient
              colors={['#F59E0B', '#D97706']}
              style={styles.promoCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.promoTitle}>Free Delivery</Text>
              <Text style={styles.promoSubtitle}>Orders over $25</Text>
            </LinearGradient>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.promoCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.promoTitle}>20% OFF</Text>
              <Text style={styles.promoSubtitle}>Home cleaning</Text>
            </LinearGradient>
          </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  changeLocation: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 16,
  },
  quickActionCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  orderIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderIconInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  orderInfo: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  orderMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orderTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  promoScroll: {
    paddingLeft: 20,
  },
  promoCard: {
    width: 160,
    height: 100,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    justifyContent: 'center',
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
});