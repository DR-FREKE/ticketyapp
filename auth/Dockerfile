## setup base image for node
FROM node:alpine

## setup your work directory to avoid conflict of files from the image and what you are working on
WORKDIR /usr/app

## copy pakage.json to prevent unnecassary rebuilds
COPY ./package.json ./

## install all needed dependencies
RUN yarn install --only=prod

## copy remaining files from your work dir to container dir
COPY ./ ./

## RUN command to start app
CMD [ "yarn", "start" ]