const { User } = require('../models');
const bcrypt = require('bcrypt');
require('dotenv').config();

const seededPwd = bcrypt.hashSync(process.env.SEED_PASSWORD, 10);

const userData = [
  {
    username: 'lee',
    email: 'l@m.com',
    password: seededPwd,
  },
  {
    username: 'mack',
    email: 'm@m.com',
    password: seededPwd,
  },
  {
    username: 'bilbo',
    email: 'n@m.com',
    password: seededPwd,
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
