# setup base image
FROM node:18-alpine

ENV CI=true

# set container working directory
WORKDIR /usr/app

# copy package.json file to diretory we just set to prevent unnecessary rebuild
COPY ./package.json ./

# install needed dependencies on container working directory. --only=prod for dependencies not on dev dependencies
RUN yarn install

# copy the remaining files
COPY ./ ./

## command to start app on container
CMD ["yarn", "dev"]