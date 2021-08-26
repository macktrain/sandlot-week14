const seedUser = require('./user-seeds');
const seedBlogs = require('./blogs-seeds');
const seedComments = require('./comments-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  //MUST run user first because of foreign key constraints
  await seedUser();
  console.log('\n----- USER SEEDED -----\n');
  
  await seedBlogs();
  console.log('\n----- BLOGS SEEDED -----\n');

  await seedComments();
  console.log('\n----- COMMENTS SEEDED -----\n');
  
  process.exit(0);
};

seedAll();
