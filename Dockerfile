FROM node:20-bookworm-slim

RUN apt-get update && apt-get install -y \
  chromium ffmpeg fonts-liberation \
  libatk-bridge2.0-0 libatk1.0-0 libcups2 libdbus-1-3 \
  libdrm2 libgbm1 libnspr4 libnss3 libxcomposite1 \
  libxdamage1 libxfixes3 libxkbcommon0 libxrandr2 xdg-utils \
  --no-install-recommends && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV CHROMIUM_FLAGS="--no-sandbox --disable-dev-shm-usage"

WORKDIR /app

COPY package*.json ./
RUN npm ci --prefer-offline

COPY . .
RUN npm run build

# src must exist at runtime for Remotion bundler (webpack needs .tsx source files)
# COPY src ./src  <-- already copied above with "COPY . ."

EXPOSE 3000
CMD ["npm", "start"]