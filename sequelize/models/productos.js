"use strict";


module.exports = Productos;


////////////////////////////////////////////////////////////


function Productos(sequelize, objDataTypes) {

  var Productos = sequelize.define(
    'Productos',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: objDataTypes.UUID,
        defaultValue: objDataTypes.UUIDV4
      },
      producto: {
        type: objDataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      presentacion: {
        type: objDataTypes.STRING,
        allowNull: false,
        
      },
      unidad: {
        type: objDataTypes.INTEGER,
        allowNull: false
      },
      moneda: {
        type: objDataTypes.STRING,
        allowNull: false,
      },
      stock: {
        type: objDataTypes.INTEGER,
        allowNull: false,
      
      },
      precio_compra: {
        type: objDataTypes.DOUBLE,
        allowNull: false,
      },
      precio_venta: {
        type: objDataTypes.DOUBLE,
        allowNull: false,
      
      },
      imagen: {
        type: objDataTypes.STRING,
        allowNull: false
      },
      codigo_b: {
        type: objDataTypes.STRING,
        allowNull: false,
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
      associate: function(objModels) {
        Productos.belongsTo(objModels.Categorias, {
          foreignKey: 'categoria_id',allowNull: false,
          as: 'Categoria'
        });


    }
  );

  return Productos;
};
