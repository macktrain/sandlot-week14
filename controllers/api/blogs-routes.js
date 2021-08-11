const router = require('express').Router();
const { Blogs, User, Comments } = require('../../models');

// The `/api/blogs` endpoint

// find all blogs with user who created it
//TYPICALLY this would be difficult with a multitude of profiles
router.get('/', async (req, res) => {
    try {
      const blogsData = await Blogs.findAll({
        include: [
          { model: User },
          { model: Comments },
        ],
      });
      res.json(blogsData);
    } catch (e) {
      res.json(e);
      console.log(e);
    }
});

module.exports = router;
