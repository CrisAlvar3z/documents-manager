FROM node:18-alpine

WORKDIR /react-app

ENV PATH /app/node_modules/.bin:$PATH

COPY app/package.json .
COPY app/package-lock.json .
RUN npm install --force

COPY app .
EXPOSE 3000
ENV CHOKIDAR_USEPOLLING=true

CMD ["npm", "start"]
