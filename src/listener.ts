import { clear, log } from "console";
import { randomBytes } from "crypto";
import { connect } from "node-nats-streaming";
import TicketCreatedListener from "./events/ticket-created-listener";

clear();

const stan = connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  log("Listener Connected to NATS Streaming Server!");

  stan.on("close", () => {
    log("Connection Closed!");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
