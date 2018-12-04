"use strict";


module.exports = Ventas;


////////////////////////////////////////////////////////////


function Ventas(sequelize, objDataTypes) {

  var Ventas = sequelize.define(
    'Ventas',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: objDataTypes.UUID,
        defaultValue: objDataTypes.UUIDV4
      },
     
      numero_venta: {
        type: objDataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      vendedor: {
        type: objDataTypes.STRING,
        allowNull: false
      },
      moneda: {
        type: objDataTypes.STRING,
        allowNull: false,
      },
      subtotal: {
        type: objDataTypes.DOUBLE,
        allowNull: false,
      
      },
      total_iva: {
        type: objDataTypes.DOUBLE,
        allowNull: false
      },
      total: {
        type: objDataTypes.DOUBLE,
        allowNull: false,
      },
      tipo_pago: {
        type: objDataTypes.STRING,
        allowNull: false,

      },
      descuento: {
        type: objDataTypes.DOUBLE,
        defaultValue: 0,
        allowNull: false,
      },
      importe: {
        type: objDataTypes.STRING,
        allowNull: false,

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
      associate: function(objModels) {
        Ventas.belongsTo(objModels.Clientes, {
          foreignKey: 'cliente_id',allowNull: false,
          as: 'Cliente'
        });
        
        Ventas.belongsTo(objModels.Productos, {
          foreignKey: 'producto_id',allowNull: false,
          as: 'Producto'
        });
      
      }
    }
  );

  return Ventas;
};
