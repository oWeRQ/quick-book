FROM node:lts
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 8080
CMD ["yarn", "serve"]
