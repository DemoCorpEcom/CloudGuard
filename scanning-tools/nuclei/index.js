import { exec } from 'child_process';
import * as amqp from 'amqplib';
import { setTimeout } from 'timers/promises';

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

// executeCommand('ls -la').then(({ stdout, stderr }) => {
//     console.log(`stdout: ${stdout}`);
// }).catch((error) => {
//     console.error(`exec error: ${error}`);
// });


const fetchLink = async () => {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    // const queueName = process.env.QUEUE_NAME;
    const queueName = "links";

    await channel.assertQueue(queueName, { durable: false });

    channel.consume(queueName, (link) => {
        console.log(link.content.toString());

        const command = `/home/joshua/go/bin/nuclei -u "${link.content.toString()}" -t sqli-template.yaml -json`;
        console.log(command);

        executeCommand(command).then(({ stdout, stderr }) => {
            console.log(`stdout: ${stdout}`);
        }).catch((error) => {
            console.error(`exec error: ${error}`);
        });
    }, { noAck: true });
}

fetchLink();