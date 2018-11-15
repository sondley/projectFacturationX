"use strict";


module.exports = detalleCompras;


////////////////////////////////////////////////////////////


function detalleCompras(sequelize, objDataTypes) {

  var detalleCompras = sequelize.define(
    'detalleCompras',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: objDataTypes.UUID,
        defaultValue: objDataTypes.UUIDV4
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
      associate: function(objModels) {
        detalleCompras.belongsTo(objModels.Compras, {
          foreignKey: 'compra_id',allowNull: false,
          as: 'Compra'
        });
        detalleCompras.belongsTo(objModels.Proveedores, {
          foreignKey: 'proveedor_id',allowNull: false,
          as: 'Proveedor'
        });
        detalleCompras.belongsTo(objModels.Productos, {
          foreignKey: 'producto_id',allowNull: false,
          as: 'Producto'
        });
      
      }
    }
  );

  return detalleCompras;
};
