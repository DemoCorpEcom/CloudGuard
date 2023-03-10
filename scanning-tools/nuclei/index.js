import { exec } from 'child_process';
import * as amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

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
    const connection = await amqp.connect("amqp://172.16.2.181");
    const channel = await connection.createChannel();
    const template = "./sqli-template.yaml";
    // const queueName = process.env.QUEUE_NAME;
    const queueName = "nuclei";

    await channel.assertQueue(queueName, { durable: false });

    while (true) {
        const message = await channel.get(queueName, { noAck: true });
        if (message !== false) {
            
            const msg = JSON.parse(message.content);
            const command = `~/Downloads/nuclei -u ${msg.link} -t ${template} -json`;
            
            await executeCommand(command).then(({ stdout, stderr }) => {
                console.log(`stdout: ${JSON.parse(stdout)}`);
            }).catch((error) => {
                console.error(`exec error: ${error}`);
            });
        }
    };

}

fetchLink();