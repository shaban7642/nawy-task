# Dockerfile for Node.js backend
FROM node:18-alpine

RUN npm install --global npm
RUN npm install --global nodemon

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Command to run the application
CMD ["npm", "run", "watch"]