import { log } from "console";
import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Events {
  subject: Subjects;
  data: any;
}

abstract class Publisher<T extends Events> {
  abstract subject: T["subject"];
  abstract queueGroupName: string;
  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T["data"]): Promise<void> {
    return new Promise((success, failed) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          failed(err);
        }

        log(`Event Published to ${this.subject}`);
        success();
      });
    });
  }
}

export default Publisher;
