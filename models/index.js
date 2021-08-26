// import models
const User = require('./User');
const Blogs = require('./Blogs');
const Comments = require('./Comments');

// User can have a lot of blogs
User.hasMany(Blogs, {
  sourceKey: 'id',
  foreignKey: 'creatorId',
});

// A blog can only belong to 1 User
Blogs.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'creatorId',
});

// User can have a lot of comments
User.hasMany(Comments, {
  sourceKey: 'id',
  foreignKey: 'commentorid',
});

// A comment can only have one creator
Comments.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'commentorid',
});
  
// A blog can have a lot of comments
Blogs.hasMany(Comments, {
  sourceKey: 'blogid',
  foreignKey: 'commentorid',
});

// A comment can only belong to 1 blog
Comments.belongsTo(Blogs, {
  targetKey: 'blogid',
  foreignKey: 'commentorid',
});

module.exports = {
  User,
  Blogs,
  Comments,
};