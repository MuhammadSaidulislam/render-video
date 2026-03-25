# Official Remotion base image — includes Chrome, ffmpeg, and all system deps
FROM ghcr.io/remotion-dev/base:4.0.290

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install all dependencies
RUN npm ci --prefer-offline

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose the port Railway will use
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
