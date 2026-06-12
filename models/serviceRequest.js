module.exports = (sequelize, DataTypes) => {
    const ServiceRequest = sequelize.define(
      'ServiceRequest',
      {
        user_id: DataTypes.INTEGER,
        provider_id: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        status: DataTypes.BOOLEAN
      },
      {
        tableName: 'service_requests',
        underscored: true
      }
    );
  
    ServiceRequest.associate = models => {
      ServiceRequest.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
  
      ServiceRequest.belongsTo(models.Provider, {
        foreignKey: 'provider_id'
      });
    };
  
    return ServiceRequest;
  };