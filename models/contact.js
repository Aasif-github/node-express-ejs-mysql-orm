module.exports = (sequelize, DataTypes) => {

    const Contact = sequelize.define(

    'contacts',
    {
        // Model attributes are defined here
        userUUID:DataTypes.INTEGER,      // for demo of include() i uses userUUID, if we use user_uuid(same as user tbl) we don't need to use include in controller
        constact_uuid:{            
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1            
        },
        permanent_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        current_address: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
    },
    {
        // Other model options go here
    },
);

// `sequelize.define` also returns the model
// console.log('contact', Contact === sequelize.models.Contact); // true

return Contact;
}