# react to akka-http

## What’s this?

A demo application or an application template - depending on your point of view. Extending this template, you can…

* … build a react client in JavaScript/TypeScript that is bundled with webpack
* … write an HTTP server in Scala that handles all requests from the client going to routes beginning with /api

The server application is based on [akka-http-quickstart](https://github.com/akka/akka-http-quickstart-scala.g8). The client application is based on [react-webpack-typescript-starter](https://github.com/vikpe/react-webpack-typescript-starter).

## How does it work?

### In development

[Webpack dev server](https://webpack.js.org/configuration/dev-server/) serves your application for most convenient client development features like [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/). By default, it runs on port `8080` - see the files in `client/configs/webpack` to possibly change that configuration. Its [proxy feature](https://webpack.js.org/configuration/dev-server/#devserverproxy) sends all requests to `/api` routes to `localhost:8000` where the akka http server runs by default.

This way, the index document and static assets (images or the JS client) are served by webpack dev server while requests to the JSON API are handled by the akka http server.

### In production

A multi stage build process, described in the Dockerfile at root level, stitches the two applications together: It compiles the JS client, copies all assets into the Scala project’s resources folder and builds the Scala Application so that resulting application is an HTTP server which…
* serves an index HTML page when the root route is requested
* serves static assets like the JS client, images and such
* handles all requests to /api/*
* serves the same index HTML page when any other route is requesed so the client can handle routing with [react-router](https://github.com/ReactTraining/react-router).

## (Why) do I need this?

I don’t know.

My use case and the motivation to build this was the following: I wanted to check how the authentication workflow is with AWS Cognito, using the JS client authentication, when there is one ore possibly more scala applications on the server side of a microservice architecture. The akka http server simulated one of these microservices in my case.

It might also suit your needs if the team responsible for your frontend consists of few node JS developers and more java/scala developers - the former can focus entirely on building the client side of your frontend while the latter can work on the server side.

On the other hand, there are reasons why this template might not be useful for you at all: E.g. if you want to write your frontend’s server side in node JS as well in order to benefit from shared code between JS client and server. Same idea would be using ScalaJS for the client. Or, if your infrastructure is less „microservice-y“, you might want to have a full fledged framework like Play on the server side.

So again: Whether and/or why you can use this, you’ll have to find out for yourself.

## How to get started?

(Note: This assumes that your development machine set up both for working on scala projects as well as node projects. See notes at the end of this section below if that’s not the case for you.)

Clone the repository. In the `server` directory run `sbt run`. In the `client` directory run `yarn start-dev` (or `npm start-dev` of course). Open the application by browsing to `localhost:8080`. (NOT `localhost:8080` where the application server is running - this won't serve your client.)


### A build
To build a container ready to run as an application server, simply run `docker build -t my-image-tag .` in the root directory.

### ToDos for easier development

As described above, at the moment a dev environment for „both worlds“ is required. In the future, I might provide scripts / docker-compose-files so that…
* client-developers can start the server in order to work on the client without having to setup their machine for working with scala
* Scala-developers can build the client in order to work on the server without having to setup their machine for working with node JS
