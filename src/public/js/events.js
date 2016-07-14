var socket = io('http://localhost:8080/socket.io/');
var app = feathers().configure(feathers.socketio(socket));
var events = app.service('/api/events');

events.on('created', function(event) {
  console.log('event created', event);
});

$('a').on('click', function() {
  var event_id = $(this).data('event_id');
  var event_name = $(this).data('event_name');

  var Event = {
    meetup_id: event_id,
    name: event_name
  };

  events.create(Event).catch(function(error) {
    console.log(error);
  });
});

  // events.create(Event, function(error, result) {
  //   console.log(error);
  //   console.log('result' + result);
  // });

  // events.find({meetup_id: parameters.event_id}, function(error, result) {
  //   if (result.total == 0) {
  //     var Event = {
  //       name:
  //       meetup_id: parameters.event_id
  //     }
  //   }
  // });
