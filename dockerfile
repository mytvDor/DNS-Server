# Use the official Node.js image as the base
FROM node:14

# Install dnsutils for dig
RUN apt-get update && apt-get install -y dnsutils

# Create a directory for the app
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your DNS server will run on
EXPOSE 530/udp

# Command to run your app
CMD [ "node", "index.js" ]
