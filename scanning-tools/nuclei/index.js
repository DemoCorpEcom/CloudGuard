import { exec } from 'child_process';
import * as amqp from 'amqplib';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import ScanResults from './models/results.js';

dotenv.config();

const CONNECTION_URL = process.env.MONGODB_URL;

mongoose.connect(CONNECTION_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Connection failed!', err);
})

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

const storeResult = async (item) => {
    const newitem = ScanResults(item);
    await newitem.save();
}

const fetchLink = async () => {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const template = "./sqli-template.yaml";
    // const queueName = process.env.QUEUE_NAME;
    const queueName = "nuclei";

    await channel.assertQueue(queueName, { durable: false });

    while (true) {
        const message = await channel.get(queueName, { noAck: true });
        if (message !== false) {

            const { link, commitId } = JSON.parse(message.content);
            const command = `~/Downloads/nuclei -u ${link} -t ${template} -json`;

            await executeCommand(command).then(async ({ stdout, stderr }) => {
                if (stdout) {
                    const result = JSON.parse(stdout).info;
                    const output = {
                        "vulnerability": result.name,
                        "affectedUrl": link,
                        "severity": result.severity,
                        "commitId": commitId
                    };
                    storeResult(output);
                }
            }).catch((error) => {
                console.error(`exec error: ${error}`);
            });
        }
    };

}

fetchLink();