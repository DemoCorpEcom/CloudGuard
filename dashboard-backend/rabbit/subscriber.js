import * as amqp from 'amqplib';

async function consumeMessages(queueName, onMessage) {
  try {
    // connect to RabbitMQ server
    const connection = await amqp.connect('amqp://localhost');

    // create a channel
    const channel = await connection.createChannel();

    // assert the queue exists
    await channel.assertQueue(queueName, { durable: false });

    console.log(`Waiting for messages in ${queueName}...`);

    // consume messages from the queue
    channel.consume(queueName, onMessage, { noAck: true });

    // keep the program running until interrupted
    process.on('SIGINT', () => {
      channel.close();
      connection.close();
      console.log('Program interrupted, exiting...');
      process.exit();
    });
  } catch (error) {
    console.error(error);
  }
}

// usage example
consumeMessages('myQueue', (message) => {
  console.log(`Received message: ${message.content.toString()}`);
});