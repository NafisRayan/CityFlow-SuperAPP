# CityFlow API Specification

This document outlines the expected API endpoints for the CityFlow backend. The mobile app is designed to consume these endpoints.

## Base URL
```
https://api.cityflow.com/v1
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer {access_token}
```

## Common Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

---

## 1. Authentication Endpoints

### POST /auth/register
Register a new user

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "user": { ... },
  "token": "jwt_token_here"
}
```

### POST /auth/login
Login user

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### POST /auth/logout
Logout user (invalidate token)

### POST /auth/refresh
Refresh access token

---

## 2. User Endpoints

### GET /users/:userId
Get user profile

### PUT /users/:userId
Update user profile

### GET /users/:userId/addresses
Get user addresses

### POST /users/:userId/addresses
Add new address

### PUT /users/:userId/addresses/:addressId
Update address

### DELETE /users/:userId/addresses/:addressId
Delete address

### GET /users/:userId/payment-methods
Get payment methods

### POST /users/:userId/payment-methods
Add payment method

### DELETE /users/:userId/payment-methods/:methodId
Delete payment method

---

## 3. Ride Sharing Endpoints

### POST /rides/request
Request a new ride

**Request:**
```json
{
  "pickupLocation": {
    "address": "123 Main St",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  "dropoffLocation": {
    "address": "456 Oak Ave",
    "coordinates": {
      "latitude": 37.7849,
      "longitude": -122.4294
    }
  },
  "rideType": "economy",
  "paymentMethodId": "pm_123"
}
```

**Response:**
```json
{
  "id": "ride_123",
  "status": "pending",
  "estimatedPrice": 12.50,
  "estimatedTime": 15,
  "createdAt": "2024-01-01T12:00:00Z"
}
```

### GET /rides/:rideId
Get ride details

### POST /rides/:rideId/cancel
Cancel a ride

### GET /rides/drivers/nearby
Get nearby available drivers

**Query Params:**
- `lat`: Latitude
- `lng`: Longitude
- `rideType`: Type of ride (optional)

### GET /users/:userId/rides
Get user's ride history

**Query Params:**
- `page`: Page number
- `limit`: Items per page
- `status`: Filter by status

### POST /rides/:rideId/rate
Rate a completed ride

**Request:**
```json
{
  "rating": 5,
  "comment": "Great driver!"
}
```

---

## 4. Food Delivery Endpoints

### GET /food/restaurants/nearby
Get nearby restaurants

**Query Params:**
- `lat`: Latitude
- `lng`: Longitude
- `cuisine`: Filter by cuisine (optional)
- `minRating`: Minimum rating (optional)

### GET /food/restaurants/:restaurantId
Get restaurant details including menu

### POST /food/orders
Place a food order

**Request:**
```json
{
  "restaurantId": "rest_123",
  "items": [
    {
      "menuItemId": "item_1",
      "quantity": 2,
      "selectedOptions": ["opt_1", "opt_2"],
      "specialInstructions": "No onions"
    }
  ],
  "deliveryAddressId": "addr_123",
  "paymentMethodId": "pm_123",
  "deliveryInstructions": "Ring doorbell"
}
```

**Response:**
```json
{
  "id": "order_123",
  "status": "pending",
  "estimatedDeliveryTime": "2024-01-01T13:30:00Z",
  "subtotal": 25.50,
  "deliveryFee": 2.99,
  "tax": 2.28,
  "total": 30.77
}
```

### GET /food/orders/:orderId
Get order details

### GET /food/orders/:orderId/track
Get real-time order tracking

**Response:**
```json
{
  "status": "preparing",
  "estimatedDeliveryTime": "2024-01-01T13:30:00Z",
  "driver": {
    "name": "Mike",
    "phone": "+1234567890",
    "location": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  }
}
```

### POST /food/orders/:orderId/cancel
Cancel an order

### GET /users/:userId/food-orders
Get user's food order history

---

## 5. Home Services Endpoints

### GET /services/categories
Get all service categories

**Response:**
```json
[
  {
    "id": "cat_1",
    "name": "Plumbing",
    "icon": "water",
    "services": [
      {
        "id": "svc_1",
        "name": "Pipe Repair",
        "basePrice": 50,
        "priceUnit": "job"
      }
    ]
  }
]
```

### GET /services/providers
Get service providers

**Query Params:**
- `category`: Filter by category
- `lat`: Latitude
- `lng`: Longitude
- `minRating`: Minimum rating

### GET /services/providers/:providerId
Get provider details

### POST /services/bookings
Book a service

**Request:**
```json
{
  "serviceId": "svc_1",
  "providerId": "prov_123",
  "scheduledDate": "2024-01-15",
  "scheduledTime": "14:00",
  "addressId": "addr_123",
  "notes": "Need urgent repair",
  "paymentMethodId": "pm_123"
}
```

### GET /services/bookings/:bookingId
Get booking details

### POST /services/bookings/:bookingId/cancel
Cancel a booking

### GET /users/:userId/service-bookings
Get user's service booking history

### POST /services/bookings/:bookingId/rate
Rate a service provider

---

## 6. E-commerce Endpoints

### GET /shop/stores/nearby
Get nearby stores

**Query Params:**
- `lat`: Latitude
- `lng`: Longitude
- `category`: Filter by category

### GET /shop/stores/:storeId
Get store details

### GET /shop/products/search
Search products

**Query Params:**
- `q`: Search query
- `category`: Filter by category
- `storeId`: Filter by store
- `minPrice`: Minimum price
- `maxPrice`: Maximum price

### GET /shop/products/:productId
Get product details

### POST /shop/orders
Place a shopping order

**Request:**
```json
{
  "storeId": "store_123",
  "items": [
    {
      "productId": "prod_1",
      "quantity": 2,
      "selectedVariants": {
        "size": "Large",
        "color": "Blue"
      }
    }
  ],
  "deliveryAddressId": "addr_123",
  "paymentMethodId": "pm_123"
}
```

### GET /shop/orders/:orderId
Get order details

### GET /shop/orders/:orderId/track
Track order delivery

### POST /shop/orders/:orderId/cancel
Cancel an order

### GET /users/:userId/shopping-orders
Get user's shopping order history

---

## 7. Notification Endpoints

### GET /notifications
Get user notifications

**Query Params:**
- `page`: Page number
- `limit`: Items per page
- `unreadOnly`: Boolean

### PUT /notifications/:notificationId/read
Mark notification as read

### PUT /notifications/read-all
Mark all notifications as read

### DELETE /notifications/:notificationId
Delete a notification

---

## 8. Review Endpoints

### POST /reviews
Submit a review

**Request:**
```json
{
  "entityType": "restaurant|driver|provider|product",
  "entityId": "entity_123",
  "orderId": "order_123",
  "rating": 5,
  "comment": "Excellent service!",
  "images": ["url1", "url2"]
}
```

### GET /reviews
Get reviews for an entity

**Query Params:**
- `entityType`: Type of entity
- `entityId`: Entity ID
- `page`: Page number
- `limit`: Items per page

---

## 9. Payment Endpoints

### POST /payments/process
Process a payment

**Request:**
```json
{
  "amount": 50.00,
  "currency": "USD",
  "paymentMethodId": "pm_123",
  "orderId": "order_123",
  "orderType": "ride|food|service|shopping"
}
```

### GET /payments/:paymentId
Get payment details

### POST /payments/:paymentId/refund
Request a refund

---

## 10. Search Endpoints

### GET /search
Global search across all services

**Query Params:**
- `q`: Search query
- `type`: Filter by type (restaurant|store|service|product)
- `lat`: Latitude
- `lng`: Longitude

---

## WebSocket Events

### Connection
```
wss://api.cityflow.com/ws?token={access_token}
```

### Events

#### Ride Tracking
```json
{
  "event": "ride.update",
  "data": {
    "rideId": "ride_123",
    "status": "in-progress",
    "driver": {
      "location": {
        "latitude": 37.7749,
        "longitude": -122.4194
      }
    }
  }
}
```

#### Order Tracking
```json
{
  "event": "order.update",
  "data": {
    "orderId": "order_123",
    "status": "preparing",
    "estimatedTime": "2024-01-01T13:30:00Z"
  }
}
```

#### Notifications
```json
{
  "event": "notification",
  "data": {
    "id": "notif_123",
    "type": "order_delivered",
    "title": "Order Delivered",
    "message": "Your order has been delivered",
    "data": { ... }
  }
}
```

---

## Rate Limiting

- **Standard**: 100 requests per minute per user
- **Search**: 30 requests per minute per user
- **Authentication**: 5 requests per minute per IP

## Error Codes

| Code | Description |
|------|-------------|
| `AUTH_REQUIRED` | Authentication required |
| `INVALID_TOKEN` | Invalid or expired token |
| `INVALID_INPUT` | Invalid request data |
| `NOT_FOUND` | Resource not found |
| `PERMISSION_DENIED` | Insufficient permissions |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `SERVICE_UNAVAILABLE` | Service temporarily unavailable |
| `PAYMENT_FAILED` | Payment processing failed |

## Pagination

All list endpoints support pagination:

**Query Params:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

**Response:**
```json
{
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

## Versioning

API version is included in the URL: `/v1/`

Breaking changes will increment the version number.
