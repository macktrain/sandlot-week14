
const session = require('express-session');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const express = require('express');
//connects express to handlebars so it can be served on express servers
const exphbs = require('express-handlebars');

const path = require('path');
var hbs = exphbs.create({ /* config */ });

// Register `hbs.engine` with the Express app.

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//this engine should be powered by handlebars
app.engine('handlebars', hbs.engine);
//this defaults to views
app.set('view engine', 'handlebars');

const routes = require('./controllers');
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});