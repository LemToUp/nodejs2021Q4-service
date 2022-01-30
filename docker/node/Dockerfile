FROM node:16.13.1-alpine as base

USER node

WORKDIR /app

RUN chown -Rh node:node /app

COPY --chown=node:node package*.json .
RUN npm install && npm cache clean --force

RUN mkdir -p /app/src
RUN mkdir -p /app/logs
RUN mkdir -p /app/dist

COPY --chown=node:node .eslintignore .
COPY --chown=node:node .eslintrc.json .
COPY --chown=node:node tsconfig.json .

EXPOSE 4000

CMD ["npm", "run", "docker:run"]
