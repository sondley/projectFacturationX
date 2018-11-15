"use strict";


module.exports = usuariosPermisos;


////////////////////////////////////////////////////////////


function usuariosPermisos(sequelize, objDataTypes) {

  var usuariosPermisos = sequelize.define(
    'usuariosPermisos',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: objDataTypes.UUID,
        defaultValue: objDataTypes.UUIDV4
      },
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
      associate: function(objModels) {
        usuariosPermisos.belongsTo(objModels.Usuarios, {
          foreignKey: 'usuario_id',allowNull: false,
          as: 'Usuario'
        });
        usuariosPermisos.belongsTo(objModels.Permisos, {
          foreignKey: 'permiso_id',allowNull: false,
          as: 'Permiso'
        });
      }
    }
  );

  return usuariosPermisos;
};
