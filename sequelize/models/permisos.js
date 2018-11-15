"use strict";


module.exports = Permisos;


////////////////////////////////////////////////////////////


function Permisos(sequelize, objDataTypes) {

  var Permisos = sequelize.define(
    'Permisos',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: objDataTypes.UUID,
        defaultValue: objDataTypes.UUIDV4
      },
      name: {
        type: objDataTypes.STRING,
        allowNull: false
      },
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );

  return Permisos;
};
