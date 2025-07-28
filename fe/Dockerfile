FROM node:20-alpine as build

RUN npm install -g pnpm
RUN npm install -g serve

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]

# if it's a production build, we can use nginx to serve the static files.
# FROM node:22-alpine AS node-builder

# RUN npm install -g pnpm

# WORKDIR /app

# COPY package.json ./
# COPY pnpm-lock.yaml ./

# RUN pnpm install

# COPY . .

# RUN pnpm build

# # while using nginx why it's not using CMD,
# # because we are using nginx to serve the static files, not node.
# FROM nginx:alpine
# COPY --from=node-builder /app/dist /usr/share/nginx/html

