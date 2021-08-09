const { Blogs } = require('../models');

const blogData = [
  {
    creatorId: '1',
    blogpostTitle: 'Slangin guns',
    blogpost: 'Guns come in many styles',
    blog_createDate: '2021-08-01',
  },
  {
    creatorId: '1',
    blogpostTitle: 'Slangin cows',
    blogpost: 'Cows come in many styles',
    blog_createDate: '2021-08-02',
  },
  {
    creatorId: '2',
    blogpostTitle: 'Slangin Triplets',
    blogpost: 'Triplets come in many styles',
    blog_createDate: '2021-08-03',
  },
  {
    creatorId: '2',
    blogpostTitle: 'Slangin toilet paper',
    blogpost: 'Toilet papering a home aint easy',
    blog_createDate: '2021-08-04',
  },
];

const seedBlogs = () => Blogs.bulkCreate(blogData);

module.exports = seedBlogs;
