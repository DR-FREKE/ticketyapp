/** needed to publish events */
import nats from 'node-nats-streaming';

/** use this library to create a client */
const stan = nats.connect('tickety', 'abc', {
  url: 'http://localhost:4333',
});

stan.on('connect', async () => {
  // wait for nats to connect then continue task here
  console.log('publisher has connected to NATS');
});

stan.on('error', err => {
  console.error('Error connecting to db', err);
});
