const app = require('../app');
const router = require('feathers').Router();

const members = app.service('/api/members');
const events = app.service('/api/events');

router.get('/:event_id/:member_id', (req, res) => {
  members.get(req.params.member_id).then((member) => {
    if (!member) {
      return next(new Error('Member not found.'));
    }
    else {
      if (member.complete_profile) {
        events.update(req.params.event_id, {
          $addToSet: { 'attendees.yes': req.params.member_id }
        }).then((result) => {
          if (!result) { return next(new Error('Couldn\'t update.')); }
          else {
            return res.render('checked-in', {
              event: result
            });
          }
        }).catch((error) => {
          return next(error);
        });
      }
      else {
        return res.render('member', {
          member: member,
          event_id: req.params.event_id,
          member_id: req.params.member_id
        });
      }
    }
  }).catch((error) => {
    return next(error);
  })
});

module.exports = router;
