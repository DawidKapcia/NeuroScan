FROM node:latest

WORKDIR /app/frontend/

COPY package*.json /app/frontend/

RUN rm -rf node_modules package-lock.json

RUN npm cache clean --force

RUN npm install

COPY . /app/frontend/

EXPOSE 5173

CMD ["npm", "run", "dev"]