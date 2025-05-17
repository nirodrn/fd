# Frontend Development Guide

## Project Overview

A React-based food delivery platform with multiple user roles (Customer, Restaurant Admin, Delivery Person) and real-time delivery tracking.

## Project Setup

```bash
# Create new Vite project
npm create vite@latest foodie-frontend -- --template react
cd foodie-frontend

# Install dependencies
npm install
```

## Required Dependencies

```json
{
  "dependencies": {
    "@mapbox/mapbox-gl-directions": "^4.1.1",
    "axios": "^1.6.0",
    "mapbox-gl": "^2.15.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.18.0",
    "socket.io-client": "^4.7.2",
    "@stripe/stripe-js": "^2.0.0",
    "tailwindcss": "^3.0.0",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^4.12.0"
  }
}
```

## Project Structure

```
src/
├── assets/              # Static assets
├── components/          # Reusable components
│   ├── auth/           # Authentication components
│   ├── restaurant/     # Restaurant related components
│   ├── order/          # Order related components
│   ├── delivery/       # Delivery tracking components
│   └── common/         # Shared components
├── pages/              # Page components
├── services/           # API service layer
├── context/            # React context providers
├── hooks/              # Custom hooks
├── utils/              # Utility functions
└── styles/             # Global styles
```

## Key Features & Components

### Authentication Components

```jsx
// src/components/auth/LoginForm.jsx
function LoginForm({ role = 'customer' }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/users/login-${role}`, formData);
      // Handle successful login
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### Restaurant Management

```jsx
// src/components/restaurant/RestaurantCard.jsx
function RestaurantCard({ restaurant }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img 
        src={restaurant.images[0]?.url} 
        alt={restaurant.name}
        className="w-full h-48 object-cover rounded"
      />
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{restaurant.name}</h3>
        <p className="text-gray-600">{restaurant.cuisineType}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">⭐</span>
          <span className="ml-1">{restaurant.rating}</span>
        </div>
      </div>
    </div>
  );
}
```

### Order System

```jsx
// src/components/order/OrderForm.jsx
function OrderForm({ restaurant }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const handleSubmit = async () => {
    try {
      const order = await createOrder({
        restaurantId: restaurant.id,
        items,
        totalAmount: total
      });
      
      // Handle successful order
      toast.success('Order placed successfully');
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  return (
    <div className="space-y-4">
      {/* Order form fields */}
    </div>
  );
}
```

### Delivery Tracking

```jsx
// src/components/delivery/DeliveryMap.jsx
function DeliveryMap({ deliveryId }) {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL);
    
    socket.on(`delivery_location_${deliveryId}`, (data) => {
      setLocation(data);
      updateMap(data);
    });

    return () => socket.disconnect();
  }, [deliveryId]);

  return (
    <div id="map" ref={mapRef} className="h-96 w-full rounded-lg" />
  );
}
```

## API Integration

### API Service Layer

```jsx
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const restaurantService = {
  getNearby: (params) => api.get('/restaurants/nearby-restaurants', { params }),
  getMenu: (id) => api.get(`/menu/${id}`),
  addMenuItem: (id, data) => api.post(`/menus/add-menu/${id}`, data)
};

export const orderService = {
  create: (data) => api.post('/orders/create-order', data),
  getMyOrders: () => api.get('/orders/my-orders'),
  trackDelivery: (orderId) => api.get(`/deliveries/customer/${orderId}`)
};
```

## State Management

```jsx
// src/context/AuthContext.js
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials) => {
    const { data } = await api.post('/users/login-user', credentials);
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
```

## Environment Configuration

```env
VITE_API_URL=http://localhost:8000
VITE_SOCKET_URL=ws://localhost:4002
VITE_MAPBOX_TOKEN=your_mapbox_token
VITE_STRIPE_KEY=your_stripe_public_key
```

## Error Handling

```jsx
// src/components/common/ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Performance Optimization

1. Lazy Loading Routes
```jsx
const RestaurantPage = lazy(() => import('./pages/RestaurantPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </Suspense>
  );
}
```

2. Memoization
```jsx
const MemoizedRestaurantCard = memo(RestaurantCard, (prev, next) => {
  return prev.id === next.id && prev.rating === next.rating;
});
```

## Security Best Practices

1. XSS Prevention
```jsx
// Use DOMPurify for sanitizing HTML content
import DOMPurify from 'dompurify';

function SafeHTML({ content }) {
  return <div dangerouslySetInnerHTML={{ 
    __html: DOMPurify.sanitize(content) 
  }} />;
}
```

2. Secure Storage
```jsx
// Sensitive data handling
const secureStorage = {
  set: (key, value) => {
    sessionStorage.setItem(key, btoa(JSON.stringify(value)));
  },
  get: (key) => {
    try {
      return JSON.parse(atob(sessionStorage.getItem(key)));
    } catch {
      return null;
    }
  }
};
```

## Testing Setup

```jsx
// src/components/RestaurantCard.test.js
import { render, screen } from '@testing-library/react';
import RestaurantCard from './RestaurantCard';

test('renders restaurant information correctly', () => {
  const restaurant = {
    name: 'Test Restaurant',
    cuisineType: 'Italian',
    rating: 4.5
  };

  render(<RestaurantCard restaurant={restaurant} />);
  
  expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
  expect(screen.getByText('Italian')).toBeInTheDocument();
  expect(screen.getByText('4.5')).toBeInTheDocument();
});
```