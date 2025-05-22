FROM node:lts

WORKDIR /app
COPY . /app

ENV PATH=/app/node_modules/.bin/:$PATH

COPY ./docker/local/node/entrypoint /entrypoint
RUN chmod +x /entrypoint

RUN npm install && npm cache clean --force

EXPOSE 4321
ENTRYPOINT ["/entrypoint"]
