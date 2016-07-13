const path = require('path');
const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const bodyParser = require('body-parser');
const handler = require('feathers-errors/handler');
const configuration = require('feathers-configuration');
const sass = require('node-sass-middleware');
const services = require('./services');

const app = feathers();

app.configure(configuration(__dirname));
app.configure(rest());
app.configure(socketio());
app.configure(services);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(handler());
app.use(
  sass({
    src: path.join(__dirname, 'scss/'),
    dest: path.join(__dirname, 'public/assets/styles/'),
    debug: false,
    force: true,
    outputStyle: 'compressed',
    prefix: '/static/assets/styles/'
  })
);

app.use('/static', feathers.static(path.join(__dirname, 'public')));

module.exports = app;
