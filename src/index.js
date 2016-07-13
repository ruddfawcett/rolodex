const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

const routes = require('./routes/');

app.use('/events', routes.events);

// app.use('/', (req, res) =>
//   res.render('index')
// );

server.on('listening', () =>
  console.log(`CSNYC Meetup is live on ${app.get('host')}:${port}.`)
);
