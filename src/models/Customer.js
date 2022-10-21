const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Customer', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: true
    },
    companyName:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    companyUrl:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    role:{
        type: DataTypes.ENUM('admin','user'),
        allowNull: false,
        defaultValue:'user'
    },
    recoveryToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  });
};