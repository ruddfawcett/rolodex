var socket = io('http://localhost:8080');
var app = feathers().configure(feathers.socketio(socket));
var members = app.service('/api/members');

$('input.searchbar').keyup(function() {
  if ($(this).val().length === 0) {
    $('.results').empty();
    return;
  }

  var str = $(this).val();
  $('.results').empty();
  members.find({query: {name: { $search: str}}}).then(results => {
    if (results.data.length != 0) {
      $.each(results.data, function(index, result) {
        var item = $('<div class=\'person\'>').attr('data-member-id', result._id).attr('data-member-name', result.name);

        item.append($('<img>').css('background-image',`url(${result.avatar})`));
        item.append($('<h1>').append(result.name));

        $('.results').append(item);
      });
    }
  }).catch(error => {
    console.log(error);
  });
});

$('body').on('click', '.results .person', function() {
  var id = $(this).data('member-id');
  var name = $(this).data('member-name').replace(' ', '-');
  window.location = `../../members/${id}/${name}`;
});
