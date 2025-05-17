# Frontend Development and Containerization Guide

## Project Setup

1. Create a new Vite React project:
```bash
npm create vite@latest foodie-frontend -- --template react
cd foodie-frontend
npm install
```

2. Install required dependencies:
```bash
npm install @mapbox/mapbox-gl-directions axios mapbox-gl react-router-dom socket.io-client @stripe/stripe-js
```

## Project Structure
Follow the structure defined in `frontend.md` for organizing components, pages, and services.

## Docker Configuration

1. Create a Dockerfile:
```dockerfile
# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

2. Create nginx.conf:
```nginx
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API Gateway proxy
    location /api/ {
        proxy_pass http://api-gateway:8000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket proxy for delivery tracking
    location /socket.io/ {
        proxy_pass http://delivery-service:4002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }
}
```

3. Update docker-compose.yml to include frontend:
```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - api-gateway
    networks:
      - foodie-net
    environment:
      - VITE_API_BASE_URL=http://localhost:8000
      - VITE_SOCKET_URL=ws://localhost:4002
      - VITE_GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}
      - VITE_MAPBOX_API_KEY=${MAPBOX_API_KEY}
      - VITE_STRIPE_PUBLIC_KEY=${STRIPE_PUBLIC_KEY}
```

## Environment Configuration

1. Create .env.development:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_SOCKET_URL=ws://localhost:4002
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
VITE_MAPBOX_API_KEY=your_mapbox_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

2. Create .env.production:
```env
VITE_API_BASE_URL=/api
VITE_SOCKET_URL=/socket.io
VITE_GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}
VITE_MAPBOX_API_KEY=${MAPBOX_API_KEY}
VITE_STRIPE_PUBLIC_KEY=${STRIPE_PUBLIC_KEY}
```

## Kubernetes Configuration

1. Create frontend-deployment.yaml:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: foodie-frontend:latest
          ports:
            - containerPort: 80
          env:
            - name: VITE_GOOGLE_MAPS_API_KEY
              valueFrom:
                secretKeyRef:
                  name: frontend-secrets
                  key: google-maps-key
            - name: VITE_MAPBOX_API_KEY
              valueFrom:
                secretKeyRef:
                  name: frontend-secrets
                  key: mapbox-key
            - name: VITE_STRIPE_PUBLIC_KEY
              valueFrom:
                secretKeyRef:
                  name: frontend-secrets
                  key: stripe-public-key
---
apiVersion: v1
kind: Service
metadata:
  name: frontend
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 80
  selector:
    app: frontend
```

2. Create frontend-secrets.yaml:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: frontend-secrets
type: Opaque
data:
  google-maps-key: base64_encoded_key
  mapbox-key: base64_encoded_key
  stripe-public-key: base64_encoded_key
```

## Security Best Practices

1. Environment Variables:
   - Never commit .env files
   - Use different configs for development and production
   - Store sensitive keys in Kubernetes secrets

2. API Security:
   - Implement JWT token storage in HttpOnly cookies
   - Add request/response interceptors for token handling
   - Implement CSRF protection

3. Asset Security:
   - Enable Content Security Policy (CSP)
   - Implement Subresource Integrity (SRI) for external resources
   - Use secure cookie attributes

## Build and Deployment

1. Local Development:
```bash
npm run dev
```

2. Docker Build:
```bash
docker build -t foodie-frontend .
```

3. Docker Compose:
```bash
docker-compose up -d
```

4. Kubernetes Deployment:
```bash
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-secrets.yaml
```

## Testing

1. Unit Tests:
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
npm test
```

2. E2E Tests:
```bash
npm install --save-dev cypress
npm run cypress:open
```

## Monitoring

1. Error Tracking:
   - Implement error boundary components
   - Set up error logging service
   - Monitor API response times

2. Performance:
   - Enable React DevTools profiler
   - Monitor bundle size
   - Track page load metrics

## CI/CD Pipeline

1. GitHub Actions workflow:
```yaml
name: Frontend CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
      - name: Build Docker image
        run: docker build -t foodie-frontend .
      - name: Push to registry
        run: |
          docker tag foodie-frontend registry.example.com/foodie-frontend
          docker push registry.example.com/foodie-frontend
```