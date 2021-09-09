const router = require('express').Router();
const { User, Comments } = require('../../models');

// The `/api/comments` endpoint

// get comments by id
//routet.get ":/id" will pull up a comment by its id
router.get('/:id', async (req, res) => {
    try {
      const commentData = await Comments.findAll({  
        where: { blogid: req.params.id},
        include: [
          { model: User,
          attributes: ['id', 'username'] },
        ],
        raw : true ,
        nest : true
      });
      
      res.json(commentData);
    } catch (e) {
      res.json(e);
      console.log(e);
    }
});

// router.post "/" will create a new comment for a signed in user
router.post('/', async (req, res) => {
  try {
    
    const newCommentData = await Comments.create(req.body);
    // Successful request => error code 200
    res.status(200).json(newCommentData);
    
  } catch (err) {
    // Cannot understand request => error code 400
    res.status(400)
      .json(err);
  }
});

module.exports = router;
