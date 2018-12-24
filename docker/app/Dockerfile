FROM node:alpine

WORKDIR /var/app

COPY ./build /var/app

RUN npm install --no-package-lock --no-optional

ENTRYPOINT [ "npm" ]
CMD [ "run", "start:app", "--silent" ]