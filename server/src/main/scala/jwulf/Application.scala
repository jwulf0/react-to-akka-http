package jwulf

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.{ActorContext, Behaviors}
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Route
import jwulf.counting.{CountingActor, CountingRoutes}
import akka.actor.typed.scaladsl.adapter._

import scala.util.{Failure, Success}

object Application {
  private def buildRoutes()(implicit actorContext: ActorContext[_]): Route = {
    import akka.http.scaladsl.server.Directives._

    implicit val system = actorContext.system
    implicit val ec = actorContext.executionContext
    implicit val scheduler = system.scheduler

    val countingActor =
      actorContext.spawn(CountingActor.behavior, "counting-actor")
    val counterRoutes = CountingRoutes.build(countingActor)

    val apiRoutes = concat(pathPrefix("counter")(counterRoutes))

    import akka.http.scaladsl.server.directives.ContentTypeResolver.Default

    val applicationRoutes: Route = concat(
      pathEndOrSingleSlash(getFromResource("public/index.html")),
      pathPrefix("assets") {
        getFromResourceDirectory("public/assets")
      },
      pathPrefix("api")(apiRoutes),
      getFromResource("public/index.html")
    )

    applicationRoutes
  }

  private def startHttpServer(routes: Route, system: ActorSystem[_]): Unit = {
    // Akka HTTP still needs a classic ActorSystem to start
    implicit val classicSystem: akka.actor.ActorSystem = system.toClassic
    import system.executionContext

    val futureBinding = Http().bindAndHandle(routes, "0.0.0.0", 8000)
    futureBinding.onComplete {
      case Success(binding) =>
        val address = binding.localAddress
        system.log.info(
          "Server online at http://{}:{}/",
          address.getHostString,
          address.getPort
        )
      case Failure(ex) =>
        system.log.error("Failed to bind HTTP endpoint, terminating system", ex)
        system.terminate()
    }
  }

  def main(args: Array[String]): Unit = {
    val rootBehavior = Behaviors.setup[Nothing] { implicit context =>
      val routes = buildRoutes()
      startHttpServer(routes, context.system)

      Behaviors.empty
    }
    val system = ActorSystem[Nothing](rootBehavior, "ReactToAkkHttpServer")

  }
}
