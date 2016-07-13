const path = require('path');
const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const bodyParser = require('body-parser');
const handler = require('feathers-errors/handler');
const configuration = require('feathers-configuration');
const sass = require('node-sass-middleware');

const app = feathers();

app.configure(configuration(__dirname));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.configure(rest());
app.configure(socketio());
app.use(handler());

app.use(
  sass({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public/assets/styles'),
    debug: true,
    outputStyle: 'compressed'
  })
);

app.use(feathers.static(path.join(__dirname, 'public')));

const port = app.get('port');
const server = app.listen(port);

app.get('/', (req, res) =>
  res.render('index')
);

server.on('listening', () =>
  console.log(`Feathers application started on ${app.get('host')}:${port}`)
);
