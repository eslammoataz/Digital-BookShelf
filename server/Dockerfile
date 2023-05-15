FROM node:14 as base 

WORKDIR /app
COPY package.json .

FROM base as development

RUN  npm install
COPY . .
EXPOSE 4000

# RUN cd /server & npx sequelize-cli db:migrate
CMD [ "npm","run","start" ]

FROM base as production

RUN  npm install --only=production
COPY . .
EXPOSE 4000
EXPOSE 587
# RUN npx sequelize-cli db:migrate

CMD [ "npm","run","prod" ]