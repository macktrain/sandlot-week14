const router = require('express').Router();
const { User, Blogs, Comments } = require('../models');
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

router.get('/openBlog/:blogid', async (req,res) => {
  try {
      req.session ? (logged_in = req.session.logged_in) : (logged_in=false)

      // let query = 'SELECT blogs.*, comments.* FROM blogs b ';
      // query += 'RIGHT JOIN comments c ';
      // query += 'ON b.blogid = c.commentid ';
      // query += 'WHERE b.blogid = (:blogid) ';


      // const blog = await dbBlog.sequelize.query(query, {
      //     replacements: { blogid: req.params.blogid },
      //     type: sequelize.QueryTypes.SELECT,
      // });
      
      const blog = await Blogs.findAll({
        include: [{
          model: Comments,
          where: { commentid : req.params.blogid },
          right: true 
        }],
        raw : true,
        nest : true 
      });
      
      console.log ('********************************************************');
      console.log ('********************************************************');
      console.log ('********************************************************');
      console.log (blog);
      console.log ('********************************************************');
      console.log ('********************************************************');
      console.log ('********************************************************');
      
      res.render('blogDetail', {
        blog,
        logged_in,
        userid : req.session.user,
      });
  } catch (err) {
      res.status(500).json(err);
  }
});
module.exports = router;