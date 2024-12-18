FROM node:lts

WORKDIR /app
COPY . /app

ENV PATH=/app/node_modules/.bin/:$PATH

RUN npm install && npm cache clean --force
CMD ["npm", "run", "start"]

EXPOSE 4321
