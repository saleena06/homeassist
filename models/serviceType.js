module.exports = (sequelize, DataTypes) => {
  const ServiceType = sequelize.define(
    "ServiceType",
    {
      service_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "service_types",
      timestamps: false,
    }
  );

  ServiceType.associate = (models) => {
    ServiceType.hasMany(models.Provider, {
      foreignKey: "service_type_id",
    });
  };

  return ServiceType;
};
