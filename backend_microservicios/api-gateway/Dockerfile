# Base Image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy application code
COPY . .

# Expose port
EXPOSE 4000

# Start the app
CMD ["npm", "run", "start"]
