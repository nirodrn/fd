#!/bin/bash

# Build and start all services
echo "🚀 Starting all services..."
docker-compose up --build -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

echo "✅ All services are up and running!"
echo "
Services available at:
- API Gateway: http://localhost:8000
- User Service: http://localhost:8090
- Restaurant Service: http://localhost:5001
- Order Service: http://localhost:5002
- Payment Service: http://localhost:5004
- Delivery Service: http://localhost:4002
"