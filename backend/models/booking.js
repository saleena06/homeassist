module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define(
  "Mybookings",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    provider_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    service: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    booking_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "Pending",
        "Accepted",
        "Completed",
        "Cancelled"
      ),
      allowNull: false,
      defaultValue: "Pending",
    },
  },
  {
    tableName: "Mybookings",
    timestamps: true,
  }
);
return Booking;
};

