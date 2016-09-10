const Q = require('q');
const async = require('async');

var self = module.exports = {
  findEvent: (app, meetup_id) => {
    var P = Q.defer();
    const events = app.service('/api/events');

    events.find({query:{meetup_id: meetup_id}}).then((meeting) => {
      if (meeting.data.length) {
        P.resolve({ app: app, event: meeting.data[0] });
      }
      else {
        throw new Error('Event not found');
      }
    }).catch((error) => {
      throw error;
    })

    return P.promise;
  },
  loadMembers: (data) => {
    var P = Q.defer();
    const members = data.app.service('/api/members');
    const meetup = require('meetup-api')({
      key: data.app.get('MEETUP_API_KEY')
    });

    meetup.getRSVPs({event_id: data.event.meetup_id}, (error, response) => {
      var attendees = [];
      async.forEach(response['results'], (rsvp, callback) => {
        var aMember = {
          name: rsvp.member.name,
          meetup_id: rsvp.member.member_id
        };

        if (typeof rsvp.member_photo !== 'undefined') {
          aMember.avatar = rsvp.member_photo.photo_link;
        }

        members.find({query:{meetup_id: aMember.meetup_id}}).then((member) => {
          if (member.data.length) {
            attendees.push(member.data[0]);
            callback();
          }
          else {
            self.createMember(data.app, aMember).then((member) => {
              attendees.push(member);
              callback();
            }).catch((error) => {
              throw error;
            });
          }
        }).catch((error) => {
          throw error;
        });
      }, () => {
        P.resolve({
          app: data.app,
          meeting: data.event,
          attendees: attendees
        });
      });
    });

    return P.promise;
  },
  createMember: (app, data) => {
    var P = Q.defer();
    const members = app.service('/api/members');
    members.create(data).then((member) => {
      if (!member) {throw new Error('Member not found');}
      else {
        P.resolve(member);
      }
    }).catch((error) => {
      throw error;
    });

    return P.promise;
  },
  addMembers: (data) => {
    var attendees = data.attendees;
    const events = data.app.service('/api/events');

    var P = Q.defer();

    async.each(attendees, (member, callback) => {
      events.update(data.meeting._id, {$addToSet: {'attendees.no': member._id}}).then((result) => {
        if (result) {
          callback();
        }
        else {
          throw new Error('Couldn\'t add member to event.');
        }
      }).catch((error) => {
        throw error;
      });
    }, () => {
      events.get(data.meeting._id).then((result) => {
        P.resolve(result);
      }).catch((error) => {
        throw error;
      });
    });

    return P.promise;
  }
}
