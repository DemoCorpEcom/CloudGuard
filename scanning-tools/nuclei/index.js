import { exec } from 'child_process';
import * as amqp from 'amqplib';

const executeCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}

const fetchLink = async () => {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    // const queueName = process.env.QUEUE_NAME;
    const queueName = "links";

    await channel.assertQueue(queueName, { durable: false });

    while (true) {
        const message = await channel.get(queueName, { noAck: true });
        if (message !== false) {
            console.log(JSON.parse(message.content));

            // const command = `python3 /home/joshua/Documents/wait.py ${message.content.toString()}`;

            // await executeCommand(command).then(({ stdout, stderr }) => {
            //     console.log(`stdout: ${stdout}`);
            // }).catch((error) => {
            //     console.error(`exec error: ${error}`);
            // });
        }
    };

}

fetchLink();