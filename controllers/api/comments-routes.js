const router = require('express').Router();
const { User, Comments } = require('../../models');

// The `/api/comments` endpoint

// get comments by id
router.get('/:id', async (req, res) => {
    try {
      console.log('**********************req.body**********************');
      console.log('**********************req.body**********************');
      console.log('**********************req.body**********************');
      console.log(req.body);
      console.log('**********************req.body**********************');
      console.log('**********************req.body**********************');
      console.log('**********************req.body**********************');
      const commentData = await Comments.findAll({  
        where: { blogid: req.params.id},
        include: [
          { model: User,
          attributes: ['id', 'username'] },
        ],
        raw : true ,
        nest : true
    });
    console.log('**********************commentData**********************');
    console.log('**********************commentData**********************');
    console.log('**********************commentData**********************')
    console.log(commentData);
    console.log('**********************commentData**********************');
    console.log('**********************commentData**********************');
    console.log('**********************commentData**********************');
      
      res.json(commentData);
    } catch (e) {
      res.json(e);
      console.log(e);
    }
});

// create a new user (this is the signup capability)
router.post('/', async (req, res) => {
  
  console.log('**********************Before Try**********************');
  console.log('**********************Before Try**********************');
  console.log('**********************Before Try**********************');
  console.log("Before Try");
  console.log('**********************Before Try**********************');
  console.log('**********************Before Try**********************');
  console.log('**********************Before Try**********************');
  try {
    console.log('**********************req.body**********************');
    console.log('**********************req.body**********************');
    console.log('**********************req.body**********************');
    console.log(req.body);
    console.log('**********************req.body**********************');
    console.log('**********************req.body**********************');
    console.log('**********************req.body**********************');
    const newCommentData = await Comments.create(req.body);
    // Successful request => error code 200
    res.status(200).json(newCommentData);
    console.log('**********************newCommentData**********************');
    console.log('**********************newCommentData**********************');
    console.log('**********************newCommentData**********************');
    console.log(newCommentData);
    console.log('**********************newCommentData**********************');
    console.log('**********************newCommentData**********************');
    console.log('**********************newCommentData**********************');
  } catch (err) {
    console.log('**********************err**********************');
    console.log('**********************err**********************');
    console.log('**********************err**********************');
    console.log(err);
    console.log(res);
    console.log('**********************err**********************');
    console.log('**********************err**********************');
    console.log('**********************err**********************');
    // Cannot understand request => error code 400
    res.status(400)
      .json(err);
  }
});

module.exports = router;
