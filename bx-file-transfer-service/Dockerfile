FROM node:18.16.1

WORKDIR /bx-file-transfer-service

COPY package.json ./
COPY . .

RUN npm install -g yarn --force
RUN yarn

RUN npm install -g @nestjs/cli --force

CMD ["yarn", "start:dev"]
