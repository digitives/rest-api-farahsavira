# Use an official Node.js runtime (slim) as the base image
FROM node:14-slim

# Set the working directory in the container
WORKDIR /app

# Install Chromium and fonts required by Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-noto-cjk \
    fonts-noto-color-emoji \
    fonts-noto-core \
    fonts-noto-hinted \
    fonts-noto-unhinted

# Install build tools, Python, and other dependencies
RUN apt-get install -y \
    build-essential \
    python \
    make \
    g++

# Set the environment variable to specify Chrome binary path for Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium

# Copy your package.json and package-lock.json to the container
COPY package*.json ./

# Install your Node.js dependencies and remove the cache to reduce the image size
RUN npm install --only=production && npm cache clean --force

# Copy the rest of your application code to the container
COPY . .

# Start your Node.js application
CMD ["node", "server.js"]
