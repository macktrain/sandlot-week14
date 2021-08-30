const { Blogs } = require('../models');

const blogData = [
  {
    creatorId: 1,
    blogpostTitle: 'Slangin guns',
    blogpost: 'Guns come in many styles',
    blog_create_date: '2021-08-01',
    blog_update_date: '2021-08-05',
  },
  {
    creatorId: 1,
    blogpostTitle: 'Slangin cows',
    blogpost: 'Cows come in many styles',
    blog_create_date: '2021-08-02',
    blog_update_date: '2021-08-05',
  },
  {
    creatorId: 2,
    blogpostTitle: 'Slangin diapers',
    blogpost: 'Stay on the ready',
    blog_create_date: '2021-08-03',
    blog_update_date: '2021-08-05',
  },
  {
    creatorId: 2,
    blogpostTitle: 'Slangin toilet paper',
    blogpost: 'Toilet papering a home aint easy',
    blog_create_date: '2021-08-04',
    blog_update_date: '2021-08-05',
  },
];

const seedBlogs = () => Blogs.bulkCreate(blogData);

module.exports = seedBlogs;
