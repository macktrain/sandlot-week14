const { Comments } = require('../models');

const commentData = [
  {
    commentid: 1,
    commentorid: 2,
    comment: 'Oh-ho-ho-ho-ho-hooooo really??',
    comment_create_date: '2021-09-01 23:12:01',
    comment_update_date: '2021-09-02 01:31:09',
  },
];

const seedComments = () => Comments.bulkCreate(commentData);

module.exports = seedComments;
