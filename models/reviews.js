module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define(
      'Review',
      {
        user_id: DataTypes.INTEGER,
        provider_id: DataTypes.INTEGER,
        rating: DataTypes.INTEGER,
        comment: DataTypes.TEXT
      },
      {
        tableName: 'reviews',
        underscored: true
      }
    );
  
    Review.associate = models => {
      Review.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
  
      Review.belongsTo(models.Provider, {
        foreignKey: 'provider_id'
      });
    };
  
    return Review;
  };