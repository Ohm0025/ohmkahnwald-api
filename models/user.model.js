module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "this username is already used",
      },
      validate: {
        len: {
          args: [5, 20],
          msg: "username must have 5-20 characters",
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "this email is already used",
      },
      validate: {
        isEmail: {
          args: true,
          msg: "email is invalid",
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    bio: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
      },
    },

    imgProfile: {
      type: DataTypes.STRING,
    },

    imgCover: {
      type: DataTypes.STRING,
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    verifyCode: {
      type: DataTypes.STRING,
    },
  });

  User.associate = (db) => {
    User.hasMany(db.PostBlog, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });

    User.hasMany(db.PostSocial, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });

    User.hasMany(db.Friend, {
      foreignKey: {
        name: "senderId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });

    User.hasMany(db.Friend, {
      foreignKey: {
        name: "recieverId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return User;
};
