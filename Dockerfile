FROM node:20.2-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# COPY src/prisma ./usr/src/app/src/prisma

RUN npm prisma generate
RUN npm prisma migrate deploy

COPY . .

# RUN npm run build

FROM node:20.2-alpine

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

RUN npm dotenv -e .env.test -- npm prisma db push --accept-data-loss

EXPOSE 5000
CMD [ "npm", "run", "start:dev" ]
