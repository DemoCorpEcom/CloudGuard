import * as amqp from 'amqplib';

async function publishMessage(queueName, message) {
  try {
    // connect to RabbitMQ server
    const connection = await amqp.connect('amqp://rabbitmq');

    // create a channel
    const channel = await connection.createChannel();

    // assert the queue exists
    await channel.assertQueue(queueName, { durable: false });

    // send the message to the queue
    channel.sendToQueue(queueName, Buffer.from(message));

    console.log(`Message sent to ${queueName}: ${message}`);

    // close the channel and connection
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(error);
  }
}

export default publishMessage;