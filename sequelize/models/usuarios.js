"use strict";


module.exports = Usuarios;


////////////////////////////////////////////////////////////


function Usuarios(objSequelize, objDataTypes) {

  const Usuarios = objSequelize.define(
    'Usuarios',
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
      cargo: {
        type: objDataTypes.STRING,
        allowNull: false
      },
      usuario: {
        type: objDataTypes.STRING,
        allowNull: false,
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
      password: {
        type: objDataTypes.STRING,
        allowNull: false
      },
      estado: {
        type: objDataTypes.ENUM('0', '1'),
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

  return Usuarios;
};
