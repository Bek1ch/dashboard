# Используем официальный образ Node.js как базовый образ
FROM node:18-alpine AS builder
ENV NODE_ENV production

# Установка директории приложения в контейнере
WORKDIR /app

# Копируем файлы package.json и package-lock.json в директорию приложения
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы приложения в директорию приложения
COPY . .

# Собираем приложение
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production

# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
