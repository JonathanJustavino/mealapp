#FIXME: change node image for deployment
FROM node:20.19-bookworm-slim

# Wokring directory
WORKDIR /app

# Depdencies
COPY package*.json ./
RUN npm install

RUN npm install -g nodemon

# Copy src files
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
