FROM node:18.14.0 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build --prod

FROM nginx:alpine
COPY --from=builder /app/dist/front /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

