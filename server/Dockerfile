# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code to the container
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the Node.js server
CMD ["npm", "start"]
