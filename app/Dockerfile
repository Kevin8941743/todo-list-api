FROM node:18 AS building

WORKDIR /todo_blog 

COPY package*.json ./

RUN npm install 



FROM node:alpine 

WORKDIR /todo_blog

COPY --from=building /todo_blog /todo_blog/

COPY . .

CMD ["node", "server.js"]
