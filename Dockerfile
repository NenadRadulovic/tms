FROM node:20.2-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Install Prisma globally
RUN npm i prisma -g

COPY . .

FROM node:20.2-alpine

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/.env ./.env
COPY --from=builder /usr/src/app/.env.test ./.env.test

EXPOSE 5000

# RUN npm run build
CMD [ "npm", "run", "start:dev" ]
