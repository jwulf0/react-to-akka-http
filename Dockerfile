FROM node:13.8 as build-client-stage

WORKDIR /app

# copy package.json and package-lock.json first and run npm install so an intermediate layer is created that can be
# reused if only application code changes.
COPY client/package.json /app/package.json
COPY client/yarn.lock /app/yarn.lock
RUN yarn install

# now copy the application code itself to the build image
ADD client /app

# execute the build; this concludes the client build
RUN yarn build

FROM hseeberger/scala-sbt

WORKDIR /app
COPY server/build.sbt /app
COPY server/project /app/project
RUN sbt update

COPY server/src /app/src
COPY --from=build-client-stage /app/dist/img /app/src/main/resources/public/assets/img
COPY --from=build-client-stage /app/dist/js /app/src/main/resources/public/assets/js
COPY --from=build-client-stage /app/dist/index.html /app/src/main/resources/public/index.html

RUN sbt stage

EXPOSE 8000

CMD /app/target/universal/stage/bin/react-to-akka-http
