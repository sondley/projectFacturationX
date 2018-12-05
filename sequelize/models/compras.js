"use strict";


module.exports = Compras;


////////////////////////////////////////////////////////////


function Compras(sequelize, objDataTypes) {

  var Compras = sequelize.define(
    'Compras',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: objDataTypes.UUID,
        defaultValue: objDataTypes.UUIDV4
      },
      
      numero_compra: {
        type: objDataTypes.STRING,
        allowNull: false,
        
      },
      comprador: {
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
      cantidad: {
        type: objDataTypes.INTEGER,
        

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
     

    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
      associate: function(objModels) {
        Compras.belongsTo(objModels.Proveedores, {
          foreignKey: 'proveedor_id',allowNull: false,
          as: 'Proveedor'
        });

        Compras.belongsTo(objModels.Productos, {
          foreignKey: 'producto_id',allowNull: false,
          as: 'Producto'
        });
      
      }
    }
  );

  return Compras;
};
