const router = require('express').Router();
const bcrypt = require('bcrypt');
const {  User, Blogs, Comments } = require('../../models');

/* The `/api/user` is the endpoint */

// create a new user (this is the signup capability)
router.post('/signup', async (req, res) => {
  try {
    const newBlogUser = await User.create(req.body);
    // Successful request => error code 200
    res.status(200).json(newBlogUser);
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
  console.log (req.session);
  if (req.session.logged_in) {
    req.session.destroy(() => {
      console.log("YES");
      res.status(204).end();
    });
  } else {
    console.log("NO");
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
