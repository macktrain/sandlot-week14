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
        unique: true,
    },
    blogpost: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    blog_createDate: {
        type: DataTypes.DATE,
        allowNull: false,
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
