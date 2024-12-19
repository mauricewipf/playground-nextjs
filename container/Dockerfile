# See: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Stage 1: Build
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner

ENV NODE_ENV=production

RUN apk add --no-cache curl

# Define build-time argument
ARG API_ENDPOINT=SET_ON_BUILD_TIME

# Set environment variable
ENV API_ENDPOINT=${API_ENDPOINT}

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Set the working directory
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the built application and public files
COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Expose the port the app runs on
EXPOSE 3000

ENV PORT=3000

# Start the application
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
