// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Comments extends Model {}

// set up fields and rules for Product model
Comments.init(
  {
    blogid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'blogs',
        key: 'blogid'
      },
    },
    commentorid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment_createDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

module.exports = Comments;
