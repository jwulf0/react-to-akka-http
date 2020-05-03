package jwulf.counting

import java.util.concurrent.TimeUnit

import akka.actor.typed.{ActorRef, ActorSystem}
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.actor.typed.scaladsl.AskPattern._
import akka.util.Timeout
import jwulf.counting.CountingActor.Protocol._
import jwulf.counting.HttpProtocol.{ChangeStateRequest, CounterState}

import scala.concurrent.{ExecutionContext, Future}

object CountingRoutes {
  def build(
    counter: ActorRef[CountingActor.Protocol]
  )(implicit system: ActorSystem[_], ec: ExecutionContext): Route = {
    implicit val timeout = Timeout(5, TimeUnit.SECONDS)

    import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
    import HttpProtocol.JsonFormats._

    def getCurrentValue(): Future[CounterState] =
      counter.ask[Int](GetCounter.apply).map(CounterState)

    def updateValue(delta: Int): Future[CounterState] =
      counter.ask[Int](ChangeCounter.apply(delta, _)).map(CounterState)

    val routes: Route = pathEnd {
      concat(get {
        complete(getCurrentValue())
      }, post {
        entity(as[ChangeStateRequest]) { request =>
          complete(updateValue(request.delta))
        }
      })
    }

    routes
  }
}
