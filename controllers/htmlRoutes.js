const router = require('express').Router();
const { User, Blogs } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req,res) => {
  try {
      logged_in = req.session.logged_in;
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
  console.log ("HOMEPAGE: req.session.user = " + req.session.user);
  console.log ("HOMEPAGE: req.session.logged_in = " + req.session.logged_in);
});

router.get('/login', (req, res) => {
  res.render('login');
  console.log ("LOGIN: req.session.user = " + req.session.user);
  console.log ("LOGIN: req.session.logged_in = " + req.session.logged_in);
});

router.get('/logout', (req, res) => {
  res.render('login');
  console.log ("LOGIN: req.session.user = " + req.session.user);
  console.log ("LOGIN: req.session.logged_in = " + req.session.logged_in);
});

router.get('/signup', (req,res) => {
  res.render('signup');
  console.log ("SIGNUP: req.session.user = " + req.session.user);
  console.log ("SIGNUP: req.session.logged_in = " + req.session.logged_in);
});

router.get('/dashboard', withAuth, async (req,res) => {
  try {
      const blogData = await Blogs.findAll({
        where: {
          creatorId : req.session.user,
        }
      });
      logged_in = req.session.logged_in;
      //removes all of the extra data that is beyond the blog data that I need
      const blog = blogData.map((project) => project.get({ plain: true }));
      res.render('dashboard', {
        blog,
        logged_in,
      });
  } catch (err) {
      res.status(500).json(err);
  }
  console.log ("DASH: req.session.user = " + req.session.user);
  console.log ("DASH: req.session.logged_in = " + req.session.logged_in);
});

module.exports = router;