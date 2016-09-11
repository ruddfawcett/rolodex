const app = require('./app');
const port = app.get('port');
const server = app.listen(port) || process.env.port;

const routes = require('./routes/');

app.use('/events', routes.events);
app.use('/events', routes.members);

app.use('/', (req, res) => {
  res.redirect('/events');
});

server.on('listening', () =>
  console.log(`Rolodex is live on ${app.get('host')}:${port}.`)
);
