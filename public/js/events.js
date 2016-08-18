var socket = io('http://localhost:8080');
var app = feathers().configure(feathers.socketio(socket));
var events = app.service('/api/events');

$('a').on('click', function() {
  var event_id = $(this).data('event_id');
  var event_name = $(this).data('event_name');
  var event_date = parseInt($(this).data('event_date'));

  var Event = {
    meetup_id: event_id,
    name: event_name,
    date: new Date(event_date)
  };

  events.find({query:{ meetup_id: event_id }}).then(event => {
    if (!event) {
      return events.create(Event);
    }
    else {
      window.location = `events/${event_id}/${event_name.replace(' ', '-')}`;
    }
  }).catch(error => {
    console.log(error);
  });
});
