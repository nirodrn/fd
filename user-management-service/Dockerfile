FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

EXPOSE 8090

# Start the application
CMD ["node", "--experimental-specifier-resolution=node", "dist/app.js"]