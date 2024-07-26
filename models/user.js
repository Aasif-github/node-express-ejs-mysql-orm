const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, DataTypes, Model) => {

class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    user_uuid:{            
      type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4      
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    phone_number:{
      type:DataTypes.STRING(12),
      allowNull: false,
    },
    date_of_birth:{
      type:DataTypes.DATEONLY      
    },
    user_type:{
      type:DataTypes.BOOLEAN
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'users', // We need to choose the model name
  },
);
// the defined model is the class itself
// console.log(User === sequelize.models.User); // true

return User;
}