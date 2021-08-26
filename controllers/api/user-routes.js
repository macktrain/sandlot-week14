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
        res.status(400)
          .json({ message: 'Incorrect email or password, please try again-2' });
        return;
      }

      req.session.user = userData.id;
      req.session.logged_in = true;
      
      res.json({ 
        message: 'You are now logged in!',
      });

      req.session.save((e) => {
        // err = undefined !
        console.log(e) 
      });
      console.log ("USER-ROUTES: The user id is " + req.session.user);

    } catch (err) {
      res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
  console.log ("WE ARE HERE *****************************************************");
  console.log ("WE ARE HERE *****************************************************");
  console.log (req.session);
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();

      req.session.save((e) => {
        console.log(e) 
      });
    });
  } else {
    res.status(404).end();
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
