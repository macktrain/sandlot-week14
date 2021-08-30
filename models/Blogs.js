const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Blogs extends Model {}

Blogs.init(
  {
    blogid:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    creatorId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        },
    },
    blogpostTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    blogpost: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    blog_create_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    blog_update_date: {
        type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogs',
  }
);

module.exports = Blogs;
