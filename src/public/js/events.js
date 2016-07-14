var socket = io('http://localhost:8080');
var app = feathers().configure(feathers.socketio(socket));
var events = app.service('/api/events');

events.on('created', function(event) {
  console.log('event created', event);
});

$('a').on('click', function() {
  var event_id = $(this).data('event_id');
  var event_name = $(this).data('event_name');
  var event_date = parseInt($(this).data('event_date'));

  var Event = {
    meetup_id: event_id,
    name: event_name,
    date: new Date(event_date)
  };

  events.find({meetup_id: event_id}, function(error, result) {
    if (error) {
      console.log(error);
    }

    if (result.data.length == 0) {
      events.create(Event, function(error, result) {
        if (error) {
          console.log(error);
          return;
        }
        console.log(result);
        return;
      });
    }
    else {
      window.location = `events/${event_id}/${event_name.replace(' ', '-')}`;
    }
  })
});
