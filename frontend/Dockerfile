FROM node:20-alpine

# Wokring directory
WORKDIR /app

# Depdencies
COPY package*.json ./
RUN npm install

# Copy src files
COPY . .

EXPOSE 4200

CMD [ "npm", "run", "docker" ]
