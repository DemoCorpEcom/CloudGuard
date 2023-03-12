import { exec } from 'child_process';
import * as amqp from 'amqplib';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import axios from 'axios';

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

const storeResult = async (item) => {
    await axios.post("http://localhost:5000/api/results", item);
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
            const command = `~/Downloads/nuclei -u ${link} -t ${template} -silent -json`;

            await executeCommand(command).then(async ({ stdout, stderr }) => {
                if (stdout) {
                    const result = JSON.parse(stdout).info;
                    const output = {
                        "vulnerability": result.name,
                        "affectedUrl": link,
                        "severity": result.severity,
                        "commitId": commitId,
                        "vulId": 1
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