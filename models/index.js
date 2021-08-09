// import models
const User = require('./User');
const Blogs = require('./Blogs');
const Comments = require('./Comments');

// User can have a lot of blogs
User.hasMany(Blogs, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
});

// User can have a lot of comments
User.hasMany(Comments, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
});
  
  // A blog can only belong to 1 User
  Blogs.belongsTo(User, {
    foreignKey: 'id'
  });

  // A blog can have a lot of comments
  Blogs.hasMany(Comments, {
    foreignKey: 'blogid'
  });
  
  // A comment can only belong to 1 blog
  Comments.belongsTo(Blogs, {
    foreignKey: 'blogid'
  });

  // A comment can only have one creator
  Comments.belongsTo(User, {
    foreignKey: 'id',
  });

module.exports = {
  User,
  Blogs,
  Comments,
};
