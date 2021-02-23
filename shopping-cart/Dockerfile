FROM node:14.15.5-alpine3.10 As builder

RUN mkdir -p app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

FROM nginx

COPY --from=builder /app/dist/shopping-cart /usr/share/nginx/html