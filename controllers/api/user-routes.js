const router = require('express').Router();
const bcrypt = require('bcrypt');
const {  User, Blogs, Comments } = require('../../models');

/* The `/api/user` is the endpoint */

// create a new user (this is the signup capability)
router.post('/', async (req, res) => {
  try {
    //Assign req.body to a new object so we can manipulate the password
    const newBlogUser = req.body;
    //hash the pwd in the new object
    newBlogUser.password = await bcrypt.hash(req.body.password, 10);
    //write the new user record with the hashed password
    const newBlogUserRecord = await User.create(newBlogUser);
    // Successful request => error code 200
    res.status(200).json(newBlogUserRecord);
  } catch (err) {
    // Cannot understand request => error code 400
    res.status(400)
      .json(err);
  }
});

//login with email and pwd combo
router.post('/login', async (req, res) => {
  try {
      const userData = await User.findOne({ where: { email: req.body.email } });
      
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again-1' });
        return;
      }

      const validPassword = await userData.checkPassword(req.body.password);

      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again-2' });
        return;
      }

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });

    } catch (err) {
      res.status(400).json(err);
    }
});

//get user by email
router.get('/:email', async (req, res) => {
try {
  const emailNameData = await User.findOne(req.params.email, {
    include: [
      { model: User },
      { model: Comments },
    ],
  });
  res.json(userEmailData);
} catch (e) {
  res.json(e);
  console.log(e);
}
});
module.exports = router;
