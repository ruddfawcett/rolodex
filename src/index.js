const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

server.on('listening', () =>
  console.log(`CSNYC Meetup is live on ${app.get('host')}:${port}.`)
);
