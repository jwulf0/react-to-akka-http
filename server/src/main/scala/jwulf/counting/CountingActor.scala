package jwulf.counting

import java.util.concurrent.TimeUnit

import akka.actor.typed.{ActorRef, Behavior, Scheduler}
import akka.actor.typed.scaladsl.Behaviors

import scala.concurrent.ExecutionContext
import scala.concurrent.duration.FiniteDuration

object CountingActor {
  sealed trait Protocol

  object Protocol {

    /**
      * Replies with the current counter value
      */
    case class GetCounter(replyTo: ActorRef[Int]) extends Protocol

    /**
      * Changes the counter by delta and replies with the updated counter value
      */
    case class ChangeCounter(delta: Int, replyTo: ActorRef[Int])
        extends Protocol
  }

  import jwulf.counting.CountingActor.Protocol._

  def behavior(implicit ec: ExecutionContext, scheduler: Scheduler) = {
    def withCounterState(value: Int): Behavior[Protocol] =
      Behaviors.receiveMessage[Protocol] {
        case GetCounter(replyTo) =>
          replyTo ! value
          Behaviors.same
        case ChangeCounter(delta, replyTo) =>
          val newValue = value + delta
          if (newValue % 5 == 0) {
            scheduler.scheduleOnce(
              FiniteDuration(500, TimeUnit.MILLISECONDS),
              () => {
                replyTo ! newValue
              }
            )
          } else {
            replyTo ! newValue
          }
          withCounterState(newValue)
      }
    withCounterState(0)
  }
}
