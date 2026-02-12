FROM node:19.9.0-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --${NODE_ENV}
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]