const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("dog", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight_minimo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight_maximo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    height_minimo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height_maximo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    añosDeVida: {
      type: DataTypes.INTEGER,
    },
  });
};
