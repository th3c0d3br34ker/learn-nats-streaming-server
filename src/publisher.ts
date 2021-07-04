import { clear, log } from "console";
import { connect } from "node-nats-streaming";
import TicketCreatedPublisher from "./events/ticket-created-publisher";

clear();

const stan = connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher Connected to NATS Streaming Server!");

  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish({
      id: "asdfghj",
      title: "qwerty",
      price: 60,
    });

    await publisher.publish({
      id: "asdfghj",
      title: "qwerty",
      price: 60,
    });
  } catch (error) {
    log(error);
  }
});
