FROM mhart/alpine-node

ADD . /app
RUN cd /app && npm i

EXPOSE 3000
WORKDIR /app
CMD npm start