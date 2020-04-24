# Dockerfile args
ARG IMAGE_BASE_DEV=node:alpine
ARG IMAGE_BASE_PROD=node:alpine
ARG NODE_ENV_PROD=production

# Dockerfile development
FROM ${IMAGE_BASE_DEV} as development
WORKDIR /app/
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
CMD [ "yarn", "dev" ]

# Dockerfile production
FROM ${IMAGE_BASE_PROD} as production
ENV NODE_ENV=$NODE_ENV_PROD
WORKDIR /app/
RUN yarn global add serve
COPY --from=development /app/build ./build
ENTRYPOINT serve -s build
