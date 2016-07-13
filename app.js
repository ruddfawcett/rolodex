const path = require('path');
const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const bodyParser = require('body-parser');
const handler = require('feathers-errors/handler');
const configuration = require('feathers-configuration');
const sass = require('node-sass-middleware');

const app = feathers();

app.configure(configuration(__dirname))
   .configure(rest())
   .configure(socketio());

app.set('views', path.join(__dirname, 'views'))
   .set('view engine', 'jade');

app.use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: true }))
   .use(handler())
   .use(
    sass({
      src: path.join(__dirname, 'scss/'),
      dest: path.join(__dirname, 'public/assets/styles/'),
      debug: true,
      outputStyle: 'compressed',
      prefix: 'assets/styles/'
    })
  );

app.use(feathers.static(path.join(__dirname, 'public')));

const port = app.get('port');
const server = app.listen(port);

app.get('/', (req, res) =>
  res.render('index')
);

server.on('listening', () =>
  console.log(`CSNYC Meetup is live on ${app.get('host')}:${port}.`)
);
