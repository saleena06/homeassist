module.exports = (sequelize, DataTypes) => {
    const Provider = sequelize.define(
      'Provider',
      {
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        experience_years: DataTypes.INTEGER,
        city: DataTypes.STRING,
        address: DataTypes.TEXT,
        service_type_id: DataTypes.INTEGER,
        rating: DataTypes.FLOAT
      },
      {
        tableName: 'providers',
        underscored: true
      }
    );
  
    Provider.associate = models => {
      Provider.belongsTo(models.ServiceType, {
        foreignKey: 'service_type_id'
      });
  
      Provider.hasMany(models.ServiceRequest, {
        foreignKey: 'provider_id'
      });
  
      Provider.hasMany(models.Review, {
        foreignKey: 'provider_id'
      });
    };
  
    return Provider;
  };