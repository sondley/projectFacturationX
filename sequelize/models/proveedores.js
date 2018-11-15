"use strict";


module.exports = Proveedores;


////////////////////////////////////////////////////////////


function Proveedores(objSequelize, objDataTypes) {

  const Proveedores = objSequelize.define(
    'Proveedores',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: objDataTypes.UUID,
        defaultValue: objDataTypes.UUIDV4
      },
      razon_social: {
        type: objDataTypes.STRING,
        allowNull: true,
      },
      cedula: {
        type: objDataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      telefono: {
        type: objDataTypes.STRING,
        allowNull: false
      },
      direccion: {
        type: objDataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      
      fecha: {
        type: objDataTypes.DATE,
        allowNull: false
      },
      correo: {
        type: objDataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      estado: {
        type: objDataTypes.ENUM,
        values:['0','1'],
        allowNull: false,
        defaultValue: '0',
      },

    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );

  return Proveedores;
};
