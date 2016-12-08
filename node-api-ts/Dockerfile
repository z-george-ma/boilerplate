FROM mhart/alpine-node

WORKDIR /app
ADD package.json .
RUN npm i --production

ADD dist/ .
ENV NODE_ENV production
EXPOSE 8080

CMD node app