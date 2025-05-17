# Activity Flow Documentation

## User Authentication Flows

### Customer Authentication
1. **Registration**
   ```json
   POST /users/register-user
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "StrongPass123!",
     "phone": "1234567890",
     "address": "123 Main St",
     "nic": "200012345678",
     "role": "customer"
   }
   ```
   - System geocodes address to get latitude/longitude
   - Creates user in MongoDB
   - Returns JWT token

2. **Login**
   ```json
   POST /users/login-user
   {
     "email": "john@example.com",
     "password": "StrongPass123!"
   }
   ```
   - Validates credentials
   - Returns JWT token and user details

### Restaurant Admin Authentication
1. **Registration**
   ```json
   POST /users/register-user
   {
     "name": "Restaurant Owner",
     "email": "owner@restaurant.com",
     "password": "StrongPass123!",
     "phone": "1234567890",
     "address": "456 Food St",
     "nic": "199912345678",
     "role": "restaurant_admin"
   }
   ```

2. **Login**
   ```json
   POST /users/login-res-admin
   {
     "email": "owner@restaurant.com",
     "password": "StrongPass123!"
   }
   ```

### Delivery Person Authentication
1. **Registration**
   ```json
   POST /users/register-user
   {
     "name": "Delivery Person",
     "email": "driver@delivery.com",
     "password": "StrongPass123!",
     "phone": "1234567890",
     "address": "789 Drive St",
     "nic": "199812345678",
     "role": "delivery_person"
   }
   ```

2. **Login**
   ```json
   POST /users/login-delivery
   {
     "email": "driver@delivery.com",
     "password": "StrongPass123!"
   }
   ```

## Restaurant Management Flow

1. **Add Restaurant**
   ```json
   POST /restaurants/add-restaurant
   {
     "name": "Tasty Foods",
     "email": "info@tastyfoods.com",
     "phone": "1234567890",
     "address": "123 Restaurant Ave",
     "cuisineType": "Italian",
     "description": "Authentic Italian cuisine",
     "openingHours": "09:00",
     "closingHours": "22:00",
     "images": [/* image files */]
   }
   ```
   - System geocodes restaurant address
   - Saves restaurant details with location
   - Sets initial status as "pending"

2. **Add Menu Items**
   ```json
   POST /menus/add-menu/:restaurantId
   {
     "name": "Margherita Pizza",
     "description": "Classic Italian pizza",
     "price": 12.99,
     "category": "Main Course",
     "images": [/* image files */]
   }
   ```

## Order Flow

1. **Create Order**
   ```json
   POST /orders/create-order
   {
     "restaurantId": "restaurant_id",
     "items": [
       {
         "menuItemId": "item_id",
         "name": "Margherita Pizza",
         "price": 12.99,
         "quantity": 2
       }
     ],
     "totalAmount": 25.98
   }
   ```
   - Validates order details
   - Creates order with status "ready-to-checkout"

2. **Process Payment**
   ```json
   POST /payments/pay
   {
     "orderId": "order_id",
     "amount": 25.98,
     "paymentMethod": "card"
   }
   ```
   - Creates payment intent
   - Updates order status on success

3. **Assign Delivery**
   ```json
   POST /deliveries/create
   {
     "orderId": "order_id",
     "deliveryPersonId": "delivery_person_id",
     "pickupAddress": "123 Restaurant Ave",
     "dropoffAddress": "456 Customer St"
   }
   ```
   - Geocodes addresses
   - Calculates optimal route
   - Creates delivery assignment

## Delivery Flow

1. **Update Delivery Status**
   ```json
   PUT /deliveries/:id/status
   {
     "status": "picked_up",
     "currentLocation": {
       "latitude": 12.34567,
       "longitude": 45.67890
     }
   }
   ```

2. **Real-time Location Updates**
   ```javascript
   // WebSocket Event
   socket.emit('location_update', {
     deliveryId: 'delivery_id',
     latitude: 12.34567,
     longitude: 45.67890,
     timestamp: '2024-02-20T10:30:00Z'
   });
   ```

## Location Tracking Flow

1. **Customer View**
   - Subscribes to WebSocket updates for their delivery
   - Receives real-time location updates
   - Views delivery progress on map

2. **Delivery Person View**
   - Sends periodic location updates
   - Receives turn-by-turn navigation
   - Updates delivery status at key points

## Data Flow Between Services

1. **API Gateway** (`port: 8000`)
   - Routes requests to appropriate services
   - Handles authentication verification
   - Manages cross-service communication

2. **User Service** (`port: 8090`)
   - Manages user authentication
   - Stores user profiles
   - Handles address geocoding

3. **Restaurant Service** (`port: 5001`)
   - Manages restaurant profiles
   - Handles menu management
   - Processes restaurant-related queries

4. **Order Service** (`port: 5002`)
   - Manages order lifecycle
   - Coordinates with payment service
   - Triggers delivery creation

5. **Payment Service** (`port: 5004`)
   - Handles payment processing
   - Manages payment status
   - Coordinates with order service

6. **Delivery Service** (`port: 4002`)
   - Manages delivery assignments
   - Handles real-time tracking
   - Processes route optimization

## Security Considerations

1. **Authentication**
   - JWT-based authentication
   - Token expiration: 7 hours
   - Role-based access control

2. **API Security**
   - CORS enabled
   - Rate limiting implemented
   - Input validation on all endpoints

3. **Location Data**
   - Encrypted transmission
   - Limited access to location history
   - Periodic cleanup of old location data

## Error Handling

1. **Common Error Responses**
   ```json
   {
     "message": "Error description",
     "error": "Detailed error message"
   }
   ```

2. **Status Codes**
   - 200: Success
   - 201: Created
   - 400: Bad Request
   - 401: Unauthorized
   - 403: Forbidden
   - 404: Not Found
   - 500: Server Error