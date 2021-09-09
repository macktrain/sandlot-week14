/************************************************************************/
/* HTMLROUTES:  routes all url requests to a respective html page       */
/************************************************************************/

const router = require('express').Router();
const { User, Blogs, Comments } = require('../models');
const withAuth = require('../utils/auth');
const { QueryTypes } = require('sequelize');

// router.get "/" sends us to the homepage with all blogs that have been created.
// The user can then select a post to review and visit all comments.  
router.get('/', async (req,res) => {
  try {
      //Sets the logged_in to true/false and will be passed in with the rendering of the page
      req.session ? (logged_in = req.session.logged_in) : (logged_in=false)
      const blogData = await Blogs.findAll({
        include: [
          {
            model: User,
            attributes: ['id','username','email']
          },
        ]
      });

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

// router.get "/log" sends us to the login page
router.get('/login', (req, res) => {
  //Sets the logged_in to true/false and will be passed in with the rendering of the page
  req.session ? (logged_in = req.session.logged_in) : (logged_in=false)
  //simply renders the login
  res.render('login');
});

// router.get "/signup" if the user does not have a login, then the user 
//can create on at signup
router.get('/signup', (req,res) => {
  //Sets the logged_in to true/false and will be passed in with the rendering of the page
  req.session ? (logged_in = req.session.logged_in) : (logged_in=false)
  res.render('signup');
});

//router.get "/dashboard" once a user is logged in then they will be presented
//with all posts they have created on the dashboard.  If none, then they've the
//opportunity to create one.
router.get('/dashboard', withAuth, async (req,res) => {
  try {
      const blogData = await Blogs.findAll({
        where: {
          creatorId : req.session.user,
        },
        include: [
          {
            model: User,
            attributes: ['id','username','email']
          },
        ]
      });
      //Sets the logged_in to true/false and will be passed in with the rendering of the page
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

//router.get "/addPost" allows a logged in user to add a post from the dashboard page.  
//addPost is the page where a user is redirected once the "Add Post" is clicked on the 
//dashboard.
router.get('/addPost', (req,res) => {
  //Sets the logged_in to true/false and will be passed in with the rendering of the page
  req.session ? (logged_in = req.session.logged_in) : (logged_in=false)
  res.render('addPost', {
    logged_in,
    creatorId : req.session.user,
  });
});

//router.get "/openBlog/:blogid" pull up the detail of a blog once a blog is selected on
//the homepage.  At this point, if the user is not logged in, then they cannot comment.  
//If they are, then they can
router.get('/openBlog/:blogid', async (req,res) => {

  try {
      //Sets the logged_in to true/false and will be passed in with the rendering of the page
      req.session ? (logged_in = req.session.logged_in) : (logged_in=false)
      
      const blogData = await Blogs.findAll({
        where: { blogid: req.params.blogid },
        include: [
          {
            model: User,
            attributes: ['id','username','email']
          },
          {
            model: Comments,
            include: [
              {
                model: User,
                attributes: ['id','username','email']
              }
            ], 
          }
        ],
      });
      
      const blog = blogData.map((project) => project.get({ plain: true }));  
      
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