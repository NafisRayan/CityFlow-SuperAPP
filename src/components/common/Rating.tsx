import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface RatingProps {
  rating: number;
  size?: number;
  showNumber?: boolean;
  reviewCount?: number;
}

export default function Rating({ rating, size = 16, showNumber = true, reviewCount }: RatingProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="star" size={size} color="#F59E0B" />
      {showNumber && (
        <Text style={[styles.rating, { fontSize: size - 2 }]}>
          {rating.toFixed(1)}
          {reviewCount && <Text style={styles.reviewCount}> ({reviewCount})</Text>}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontWeight: '600',
    color: '#111827',
  },
  reviewCount: {
    color: '#6B7280',
    fontWeight: '400',
  },
});
