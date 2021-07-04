import { log } from "console";
import { Message } from "node-nats-streaming";
import Publisher from "./base-publisher";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "listener-service-queue-group";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    log("Event Data: ", data);

    msg.ack();
  }
}

export default TicketCreatedPublisher;
