const router = require('express').Router();
const { Blogs, User, Comments } = require('../../models');

// The `/api/blogs` endpoint

// find all blogs with user who created it
//TYPICALLY this would be difficult with a multitude of profiles
router.get('/', async (req, res) => {
  try {
    const blogsData = await Blogs.findAll({
        include: [
          { model: User,
          attributes: ['username'] },
        ],
    });
    res.json(blogsData);
  } catch (e) {
    res.json(e);
    console.log(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blogIdData = await Blogs.findByPk(req.params.id);
    res.json(blogIdData);
  } catch (e) {
    res.json(e);
    console.log(e);
  }
});

// create a new user (this is the signup capability)
router.post('/addNewPost', async (req, res) => {
  try {
    const newPostData = await Blogs.create(req.body);
    // Successful request => error code 200
    res.status(200).json(newPostData);
  } catch (err) {
    // Cannot understand request => error code 400
    res.status(400)
      .json(err);
  }
});

//Update a post by post id
router.put('/:blogid', (req, res) => {  
    Blogs.update(
        {
            // Update this post with the following data
            blogpost: req.body.blogpost,
            blog_update_date: req.body.blog_update_date,
        },
        {
            where: {
              blogid: req.params.blogid,
            },
        }
    )
    .then((updatedData) => {
      // Sends the updated book as a json response
      res.json(updatedData);
    })
    .catch((err) => res.json(err));
});


//Delete post by id
router.delete('/:blogid', (req, res) => {
  Blogs.destroy(
  {
    where: {
      blogid: req.params.blogid,
    },
  })
  .then((postDeleteData) => {
    res.json(postDeleteData);
  })
  .catch((err) => res.json(err));
});

module.exports = router;