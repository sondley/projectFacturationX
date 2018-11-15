"use strict";


module.exports = Empresas;


////////////////////////////////////////////////////////////


function Empresas(objSequelize, objDataTypes) {

  const Empresas = objSequelize.define(
    'Empresas',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: objDataTypes.UUID,
        defaultValue: objDataTypes.UUIDV4
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
      
      nombre: {
        type: objDataTypes.DATE,
        allowNull: false,
        unique: true,
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

  return Empresas;
};
