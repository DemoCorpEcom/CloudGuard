import request from 'request';
import * as cheerio from 'cheerio';
import url from 'url';
import * as amqp from 'amqplib';

const scraper = async (req, res) => {
  const { baseUrl, commitId } = req.body;

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
    
    const images = $('img').map((i, elem) => {
      const href = $(elem).attr('src');
      return url.resolve(baseUrl, href);
    }).get();

    try {
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();

      const exchangeName = 'links';

      await channel.assertExchange(exchangeName, 'direct', { durable: false });

      await channel.assertQueue('nuclei', { durable: false });
      await channel.assertQueue('xsstrike', { durable: false });
      await channel.assertQueue('openredirect', { durable: false });

      await channel.bindQueue('nuclei', exchangeName, 'nuclei');
      await channel.bindQueue('xsstrike', exchangeName, 'xsstrike');
      await channel.bindQueue('openredirect', exchangeName, 'xsstrike');

      for (const item of links) {
        channel.publish(exchangeName, 'nuclei', Buffer.from(JSON.stringify({ link: item, commitId: commitId })));
        channel.publish(exchangeName, 'xsstrike', Buffer.from(JSON.stringify({ link: item, commitId: commitId })));
        channel.publish(exchangeName, 'openredirect', Buffer.from(JSON.stringify({ link: item, commitId: commitId })));
      }
      for (const item of images) {
        channel.publish(exchangeName, 'openredirect', Buffer.from(JSON.stringify({ link: item, commitId: commitId })));
      }

    } catch (error) {
      console.error(error);
    }

    res.status(200).json(links);
  });

}

export default scraper;