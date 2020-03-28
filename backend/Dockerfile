# Dockerfile args
ARG IMAGE_BASE_DEV=node:alpine
ARG IMAGE_BASE_PROD=node:alpine
ARG NODE_ENV=production

# Dockerfile development
FROM ${IMAGE_BASE_DEV} as development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENTRYPOINT [ "npm", "run" ]
CMD [ "start:debug" ]

# Dockerfile production
FROM ${IMAGE_BASE_PROD} as production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app/
COPY package*.json ./
RUN npm install --only=production
COPY --from=development /app/dist ./dist
ENTRYPOINT node ./dist/main