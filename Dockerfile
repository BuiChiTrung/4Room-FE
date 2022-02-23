FROM node:10-alpine
ENV PYTHONUNBUFFERED=1
RUN apk add --no-cache g++ make python2
WORKDIR /4room
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . /4room
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "serve"]