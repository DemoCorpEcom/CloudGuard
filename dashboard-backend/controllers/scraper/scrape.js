import request from 'request';
import * as cheerio from 'cheerio';
import url from 'url';
import * as amqp from 'amqplib';

const scraper = async (req, res) => {
  const baseUrl = req.body.baseUrl;

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

    res.status(200).json(links);

    try {
      const connection = await amqp.connect('amqp://localhost:5672');
      const channel = await connection.createChannel();

      await channel.assertQueue(process.env.QUEUE_NAME, { durable: false });

      for (const item of links) {
        channel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(item));
      }

    } catch (error) {
      console.error(error);
    }

  });

}

export default scraper;