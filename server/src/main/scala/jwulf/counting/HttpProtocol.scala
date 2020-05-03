package jwulf.counting

import spray.json.DefaultJsonProtocol

object HttpProtocol {

  /**
    * Is sent on various routes containing the current counter value.
    */
  final case class CounterState(value: Int)

  /**
    * Can be sent as POST request in order to change the counter value by delta.
    */
  final case class ChangeStateRequest(delta: Int)

  object JsonFormats {
    import DefaultJsonProtocol._

    implicit val changeStateRequestFormat = jsonFormat1(ChangeStateRequest)

    implicit val counterStateFormat = jsonFormat1(CounterState)
  }
}
