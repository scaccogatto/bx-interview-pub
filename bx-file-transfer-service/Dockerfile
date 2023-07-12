FROM node:18.16.1

WORKDIR /bx-file-transfer-service

COPY package.json ./
COPY . .

RUN npm install -g yarn --force
RUN yarn

CMD ["yarn", "start:dev"]
