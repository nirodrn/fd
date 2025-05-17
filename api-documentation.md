# API Documentation for Frontend Integration

## Base URLs
```
API Gateway: http://localhost:8000
WebSocket (Delivery Tracking): ws://localhost:4002
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Authentication Endpoints

#### Register User
```http
POST /users/register-user
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "address": "string",
  "nic": "string",
  "role": "customer" | "restaurant_admin" | "delivery_person" | "admin"
}

Response: {
  "message": "User registered successfully",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

#### Login Routes
```http
POST /users/login-user         # Customer login
POST /users/login-res-admin    # Restaurant admin login
POST /users/login-delivery     # Delivery person login
POST /users/login-admin        # Admin login

Request: {
  "email": "string",
  "password": "string"
}

Response: {
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

## Restaurant Management

### Restaurant Operations

#### Add Restaurant
```http
POST /restaurants/add-restaurant
Content-Type: multipart/form-data

{
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "cuisineType": "string",
  "description": "string",
  "openingHours": "string",
  "closingHours": "string",
  "images": File[]
}

Response: {
  "message": "Restaurant submitted for admin approval",
  "restaurant": {
    "id": "string",
    "name": "string",
    "status": "pending"
  }
}
```

#### Get Nearby Restaurants
```http
GET /restaurants/nearby-restaurants
Query Parameters:
  maxDistance: number (in km, default: 5)

Response: {
  "success": true,
  "restaurants": [
    {
      "id": "string",
      "name": "string",
      "cuisineType": "string",
      "distance": number,
      "rating": number,
      "images": [
        {
          "url": "string"
        }
      ]
    }
  ]
}
```

### Menu Management

#### Add Menu Item
```http
POST /menus/add-menu/:restaurantId
Content-Type: multipart/form-data

{
  "name": "string",
  "description": "string",
  "price": number,
  "category": "string",
  "images": File[]
}

Response: {
  "message": "Menu item added.",
  "menuItem": {
    "id": "string",
    "name": "string",
    "price": number
  }
}
```

#### Get Restaurant Menu
```http
GET /menu/:restaurantId

Response: {
  "menuItems": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": number,
      "category": "string",
      "images": [
        {
          "url": "string"
        }
      ]
    }
  ]
}
```

## Order Management

### Create Order
```http
POST /orders/create-order

{
  "restaurantId": "string",
  "items": [
    {
      "menuItemId": "string",
      "name": "string",
      "price": number,
      "quantity": number
    }
  ],
  "totalAmount": number
}

Response: {
  "message": "Order placed successfully",
  "order": {
    "id": "string",
    "status": "ready-to-checkout",
    "totalAmount": number
  }
}
```

### Get User Orders
```http
GET /orders/my-orders

Response: {
  "orders": [
    {
      "id": "string",
      "restaurantId": "string",
      "items": [
        {
          "name": "string",
          "quantity": number,
          "price": number
        }
      ],
      "status": "string",
      "totalAmount": number,
      "createdAt": "string"
    }
  ]
}
```

## Payment Processing

### Create Payment Intent
```http
POST /payments/pay

{
  "orderId": "string",
  "amount": number
}

Response: {
  "clientSecret": "string",
  "payment": {
    "id": "string",
    "status": "pending"
  }
}
```

### Check Payment Status
```http
GET /payments/payment-status/:orderId

Response: {
  "status": "pending" | "completed" | "failed",
  "transactionId": "string"
}
```

## Delivery Tracking

### WebSocket Events

#### Connect to Delivery Updates
```javascript
// Client-side code
const socket = io('ws://localhost:4002');

// Listen for delivery updates
socket.on(`delivery_location_${deliveryId}`, (data) => {
  // data: {
  //   latitude: number,
  //   longitude: number,
  //   timestamp: string
  // }
});
```

### Get Active Delivery
```http
GET /deliveries/customer/:orderId

Response: {
  "delivery": {
    "id": "string",
    "status": "assigned" | "picked_up" | "in_transit" | "delivered",
    "currentLocation": {
      "latitude": number,
      "longitude": number,
      "lastUpdated": "string"
    },
    "estimatedDeliveryTime": "string"
  }
}
```

## Error Handling

All endpoints follow this error response format:
```json
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 30 requests per minute for unauthenticated users

## WebSocket Events Reference

### Delivery Tracking
```javascript
// Emit location update (Delivery Person)
socket.emit('location_update', {
  deliveryId: 'string',
  latitude: number,
  longitude: number
});

// Listen for location updates (Customer)
socket.on(`delivery_location_${deliveryId}`, (data) => {
  // Handle location update
});

// Listen for status changes
socket.on(`delivery_status_${deliveryId}`, (data) => {
  // Handle status change
});
```

## Integration Examples

### Authentication Flow
```javascript
// Login
async function login(email, password) {
  const response = await fetch('http://localhost:8000/users/login-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
}

// Authenticated Request
async function fetchUserProfile() {
  const response = await fetch('http://localhost:8000/users/get-profile', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return await response.json();
}
```

### Order Creation Flow
```javascript
// Create Order
async function createOrder(orderData) {
  const response = await fetch('http://localhost:8000/orders/create-order', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  });
  
  const order = await response.json();
  
  // Initialize payment
  const paymentResponse = await fetch('http://localhost:8000/payments/pay', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      orderId: order.id,
      amount: order.totalAmount
    })
  });
  
  return await paymentResponse.json();
}
```

### Delivery Tracking Integration
```javascript
// Initialize delivery tracking
function initializeDeliveryTracking(deliveryId) {
  const socket = io('ws://localhost:4002');
  
  socket.on(`delivery_location_${deliveryId}`, (location) => {
    // Update delivery location on map
    updateMap(location.latitude, location.longitude);
  });
  
  socket.on(`delivery_status_${deliveryId}`, (status) => {
    // Update delivery status in UI
    updateDeliveryStatus(status);
  });
  
  return socket;
}
```