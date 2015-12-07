FROM mhart/alpine-node

WORKDIR /app
ADD package.json .
RUN npm install --production

ADD dist/ .
EXPOSE 80

CMD NODE_ENV=production node app