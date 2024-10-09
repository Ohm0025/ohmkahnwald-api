module.exports = (sequelize, DataTypes) => {
  const PostSocial = sequelize.define("PostSocial", {
    postSocial: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    arrPic: {
      type: DataTypes.TEXT,
      defaultValue: "[]",
      get() {
        const rawValue = this.getDataValue("arrPic");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("arrPic", JSON.stringify(value));
      },
      validate: {
        isValidTagArray(value) {
          let tags;
          try {
            tags = JSON.parse(value);
          } catch (e) {
            throw new Error("arrPic must be a valid JSON array");
          }
          if (!Array.isArray(tags)) {
            throw new Error("arrPic must be an array");
          }
          if (!tags.every((item) => typeof item === "string")) {
            throw new Error("All arrPic must be strings");
          }
        },
      },
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

  PostSocial.associate = (db) => {
    PostSocial.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return PostSocial;
};
