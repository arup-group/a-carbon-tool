# build stage
FROM node:lts-alpine as build-stage

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# THIS SECTION IS A BIT OF A HACK TO GET THE VUE-MATERIAL MODULE WORKING
# We need a hotfixed dist of vue-material
RUN rm -rf /app/node_modules/vue-material/dist

COPY ./vue-mat-dist /app/node_modules/vue-material/dist

# build app for production with minification
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]