const app = require('../app');
const router = require('feathers').Router();

const members = app.service('/api/members');

router.get('/:member_id/:member_name', function(req, res) {

});

module.exports = router;
