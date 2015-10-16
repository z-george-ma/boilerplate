FROM mhart/alpine-node

WORKDIR /app

ADD . .

RUN npm install --production

CMD NODE_ENV=production node app