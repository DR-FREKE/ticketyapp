# setup base image for node
FROM node:alpine

# create a working directory to avoid conflict
WORKDIR /usr/app

# copy the package json file to avoid unnecassary rebuilds
COPY ./package.json ./

# install them packages
RUN yarn install --only=prod

# copy remaining files to working dir in container
COPY ./ ./

# start the app in the container
CMD [ "yarn", "start" ]