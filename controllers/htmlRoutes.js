const router = require('express').Router();
const { User, Blogs } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req,res) => {
  try {
      req.session ? (logged_in = req.session.logged_in) : (logged_in=false)
      const blogData = await Blogs.findAll();
      //removes all of the extra data that is beyond the blog data that I need
      const allBlogs = blogData.map((project) => project.get({ plain: true }));
      res.render('homepage', {
        allBlogs,
        logged_in,
      });
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  req.session ? (logged_in = req.session.logged_in) : (logged_in=false)
  res.render('login');
});

router.get('/signup', (req,res) => {
  req.session ? (logged_in = req.session.logged_in) : (logged_in=false)
  res.render('signup');
});

router.get('/dashboard', withAuth, async (req,res) => {
  try {
      const blogData = await Blogs.findAll({
        where: {
          creatorId : req.session.user,
        }
      });
      req.session ? (logged_in = req.session.logged_in) : (logged_in=false)
      //removes all of the extra data that is beyond the blog data that I need
      const blog = blogData.map((project) => project.get({ plain: true }));
      res.render('dashboard', {
        blog,
        logged_in,
      });
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/addPost', (req,res) => {
  req.session ? (logged_in = req.session.logged_in) : (logged_in=false)
  res.render('addPost', {
    logged_in,
    creatorId : req.session.user,
  });
});

module.exports = router;