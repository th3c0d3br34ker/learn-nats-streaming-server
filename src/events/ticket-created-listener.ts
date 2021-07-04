import { log } from "console";
import { Message } from "node-nats-streaming";
import Listener from "./base-listener";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "listener-service-queue-group";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    log("Event Data: ", data);

    msg.ack();
  }
}

export default TicketCreatedListener;
