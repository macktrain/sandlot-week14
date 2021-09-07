const { Comments } = require('../models');

const commentData = [
  {
    commentid: 1,
    commentorid: 2,
    comment: 'this here is me comment',
    comment_create_date: 2021-08-03,
  },
];

const seedComments = () => Comments.bulkCreate(commentData);

module.exports = seedComments;
