# Stage 1: Build
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:20-slim AS runner

# Set the working directory
WORKDIR /app

# Install production dependencies
COPY --from=builder /app/package*.json ./
RUN npm install --production

# Copy the built application and public files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
