FROM mhart/alpine-node

WORKDIR /app
ADD . .
RUN npm install --production

EXPOSE 80

CMD NODE_ENV=production node app