"use strict";


module.exports = detalleVentas;


////////////////////////////////////////////////////////////


function detalleVentas(sequelize, objDataTypes) {

  var detalleVentas = sequelize.define(
    'detalleVentas',
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
        detalleVentas.belongsTo(objModels.Ventas, {
          foreignKey: 'venta_id',allowNull: false,
          as: 'Venta'
        });
        detalleVentas.belongsTo(objModels.Clientes, {
          foreignKey: 'cliente_id',allowNull: false,
          as: 'Cliente'
        });
        detalleVentas.belongsTo(objModels.Productos, {
          foreignKey: 'producto_id',allowNull: false,
          as: 'Producto'
        });
      
      }
    }
  );

  return detalleVentas;
};
