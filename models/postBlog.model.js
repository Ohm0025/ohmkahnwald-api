module.exports = (sequelize, DataTypes) => {
  const PostBlog = sequelize.define("PostBlog", {
    postBlogId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    thumbnail: {
      type: DataTypes.STRING,
    },

    sharable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    publicity: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  PostBlog.associate = (db) => {
    PostBlog.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return PostBlog;
};
