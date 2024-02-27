FROM node:20 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build 

# Use a smaller image for serving the application
FROM nginx:alpine

# Copy the built app from the 'build' stage
COPY --from=build /app/dist/user-front /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]