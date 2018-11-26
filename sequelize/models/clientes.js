"use strict";


module.exports = Clientes;



function Clientes(objSequelize, objDataTypes) {

  const Clientes = objSequelize.define(
    'Clientes',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: objDataTypes.UUID,
        defaultValue: objDataTypes.UUIDV4
      },
      nombres: {
        type: objDataTypes.STRING,
        allowNull: true,
      },
      appelidos: {
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

  return Clientes;
};
