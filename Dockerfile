FROM node:16-alpine

WORKDIR /teletalk-server

RUN npm install -g yarn --force

COPY package.json ./
COPY yarn* ./

RUN yarn

COPY jsconfig.json ./
COPY environments/ environments/

COPY startupRequirements/ startupRequirements/

COPY src/ src/
COPY public/ public/
COPY index.js ./

COPY test/ test/

COPY esbuild.config.json ./
COPY esbuildEntryPoint.js ./

RUN npm run build

USER node

CMD [ "npm","run","start:production" ]

EXPOSE 8080
