# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source files
COPY . .

# Build the Next.js app
RUN yarn build

# Stage 2: Production
FROM node:18-alpine AS runner

WORKDIR /app

# Only copy necessary files from builder
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Install only production deps
RUN yarn install --frozen-lockfile --production

EXPOSE 3000

# Run Next.js app
CMD ["yarn", "start"]
