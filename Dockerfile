# Stage 1: Build the Node.js application
FROM node:14-slim AS build

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

# Stage 2: Build the Nginx image
FROM nginx

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the Nginx configuration file for your application
COPY nginx.conf /etc/nginx/conf.d/

# Copy the built Node.js application from the previous stage
COPY --from=build /app /usr/share/nginx/html

# Expose the port Nginx will listen on (typically 80)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
