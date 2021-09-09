const { Blogs } = require('../models');

const blogData = [
  {
    creatorId: 1,
    blogpostTitle: 'Birthday Party',
    blogpost: 'Hey everyone!  My mom is out of town and I will be celebrating my party alone .... unless someone wants to join me!',
    blog_create_date: '2021-09-01 23:12:01',
  },
];

const seedBlogs = () => Blogs.bulkCreate(blogData);

module.exports = seedBlogs;
