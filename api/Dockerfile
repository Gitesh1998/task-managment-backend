# Use the official Node.js LTS image
FROM node:18-alpine as base

# Set the working directory in the container
WORKDIR /app

# Install essential build tools (for sharp and other native modules)
RUN apk add --no-cache libc6-compat python3 make g++

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install all dependencies (including dev dependencies for building)
RUN npm install

# Copy the rest of the application code
COPY . .

COPY .env .env


# Build the application (PayloadCMS + TypeScript)
RUN npm run build

# Use a new, clean image to reduce final image size
FROM node:18-alpine as runtime

# Set the working directory in the container
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=base /app/package*.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist

# Install only production dependencies
RUN npm install --omit=dev

# Expose the backend on port 3000
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "run", "serve"]
