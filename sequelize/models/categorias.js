"use strict";


module.exports = Categorias;


////////////////////////////////////////////////////////////


function Categorias(sequelize, objDataTypes) {

  var Categorias = sequelize.define(
    'Categorias',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: objDataTypes.UUID,
        defaultValue: objDataTypes.UUIDV4
      },
      categoria: {
        type: objDataTypes.STRING,
        allowNull: false
      },
      estado: {
        type: objDataTypes.ENUM('0', '1'),
        defaultValue: '1',
      },
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );

  return Categorias;
};
