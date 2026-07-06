module.exports = (sequelize, DataTypes) => {
  const ServiceRequest = sequelize.define(
    "ServiceRequest",
    {
      user_id: DataTypes.INTEGER,
      provider_id: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      status:  {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      tableName: "service_requests",
      underscored: true,
    }
  );

  ServiceRequest.associate = (models) => {
    ServiceRequest.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "customer",
    });

    ServiceRequest.belongsTo(models.Provider, {
      foreignKey: "provider_id",
      as: "provider",
    });
  };

  return ServiceRequest;
};
