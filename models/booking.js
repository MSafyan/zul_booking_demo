module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    location: DataTypes.STRING,
    coverImage: DataTypes.STRING, // This will store the S3 URL later.
  });

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Booking;
};
