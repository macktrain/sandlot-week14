const router = require('express').Router();
const bcrypt = require('bcrypt');
const {  User, Blogs, Comments } = require('../../models');

/* The `/api/user` is the endpoint */

// router.post '/signup' will create a new user (this is the signup capability)
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

//router.post "/login: will login a user with a valid email and pwd combo
router.post('/login', async (req, res) => {
  try {
      //Here we find one user with the email that is in req.body.email
      const userData = await User.findOne({ where: { email: req.body.email } });
      //if that email does not exist then return a 400 and break out with a 'return;'
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again-1' });
        return;
      }
      //If a valid email has been found then we check the password in req.body.password
      //We don't have to worry about the hash, the model is de-hashing/de-crypting it for us.
      const validPassword = await userData.checkPassword(req.body.password);

      //If the user has entered an invalid password, then a 400 is returned and break out
      //with return.
      if (!validPassword) {
        res.status(400)
          .json({ message: 'Incorrect email or password, please try again-2' });
        return;
      }
      //Here we will have a valid user logged in and we set some session variables
      req.session.user = userData.id;
      req.session.logged_in = true;
      
      res.json({ 
        message: 'You are now logged in!',
      });

      req.session.save((e) => {
        // err = undefined
        console.log(e) 
      });
      console.log ("USER-ROUTES: The user id is " + req.session.user);

    } catch (err) {
      res.status(400).json(err);
    }
});

//router.post '/logout' simply logs a user out by destroying their session.
router.post('/logout', (req, res) => {
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

//router.get '/:email' will pull a single user by the params email and return associated
//user data and comments
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
