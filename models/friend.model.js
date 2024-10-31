module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define("Friend", {
    friendId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    status: {
      type: DataTypes.ENUM("accept", "pending", "block", "reject"),
      allowNull: false,
      defaultValue: "pending",
    },
  });

  Friend.associate = (db) => {
    Friend.belongsTo(db.User, {
      foreignKey: {
        name: "senderId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });

    Friend.belongsTo(db.User, {
      foreignKey: {
        name: "recieverId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return Friend;
};
