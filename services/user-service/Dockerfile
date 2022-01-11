# =======================================================================
# Build phase - In this phase project is build and create dist directory
# =======================================================================
FROM node:12-alpine as build

WORKDIR /usr/src/app

COPY ./package.json .

# Download all the dependancies
RUN npm install

ADD . /usr/src/app

# Build the project
RUN npm run build

# Remove dev dependancies
RUN npm prune --production

# =======================================================================
# Running phase - instruction to run the project
# =======================================================================
FROM node:12-alpine

# Application configuration
ENV APP_NAME='rooverr-seed'
ENV PORT=3001
ENV NODE_ENV='dev'

# Database Configuration
ENV DB_HOST='localhost'
ENV DB_PORT=5432
ENV DB_USERNAME='postgres'
ENV DB_PASSWORD='test'
ENV DB_NAME='postgres'
ENV DB_SCHEMA='public'

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3001

CMD [ "node", "dist/main.js"]
