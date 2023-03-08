import request from 'request';
import * as cheerio from 'cheerio';
import url from 'url';
import * as amqp from 'amqplib';

const scraper = async (req, res) => {
  const { baseUrl, commitId } = req.body;

  console.log(req.body);

  request(baseUrl, async (err, response, body) => {

    if (err) {
      console.error(err);
      process.exit(1);
    }

    const $ = cheerio.load(body);
    const links = $('a').map((i, elem) => {
      const href = $(elem).attr('href');
      return url.resolve(baseUrl, href);
    }).get();


    try {
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();
      // const queueName = process.env.QUEUE_NAME;
      const queueName = "links";

      await channel.assertQueue(queueName, { durable: false });

      for (const item of links) {
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify([item, commitId])));
      }

    } catch (error) {
      console.error(error);
    }

    res.status(200).json(links);
  });

}

export default scraper;