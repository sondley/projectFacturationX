'use strict';


const Hapi = require('hapi');
const joi = require('joi');
const Good = require('good');
const Config = require('./config');
const UsersHandler = require('./app/handlers/users');
var cors = require('cors');

const UploadSingleFilePlugin = require('./app/plugins/upload-single-file');
const SequelizeX = require('./blocks/sequelize-x').initialize(Config.sequelize, Config.sequelize, Config.modelsDir);
const server = new Hapi.Server();
const CrudX = require('./app/plugins/crud-x');

server.connection({
  routes: {
    cors: {
      origin: ['*'],
      headers: ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]
    }
  },
  port: process.env.PORT || 5000
});


const objDatabaseConfig = {
  register: require('hapi-sequelize'),
  options: [
    {
      name: Config.sequelize.database,
      models: ['./sequelize/models/*.js'],
      sequelize: SequelizeX.sequelize,
      sync: true,
      forceSync: true
    }
  ]
};

const objUsersModule = {
  register: UsersHandler
}


const objUsuariosCrudConfig = {
  model: 'Usuarios',
  path: '/usuarios'
}


const objClientesCrudConfig = {
  model: 'Clientes',
  path: '/clientes'
}


const objComprasCrudConfig = {
  model: 'Compras',
  path: '/compras'
}


const objCategoriasCrudConfig = {
  model: 'Categorias',
  path: '/categorias'
}


const objEmpresasCrudConfig = {
  model: 'Empresas',
  path: '/empresas'
}

const objPermisosCrudConfig = {
  model: 'Permisos',
  path: '/permisos'
}


const objProductosCrudConfig = {
  model: 'Productos',
  path: '/productos'
}


const objProveedoresCrudConfig = {
  model: 'Proveedores',
  path: '/proveedores'
}


const objVentasCrudConfig = {
  model: 'Ventas',
  path: '/ventas'
}

const objusuariosPermisosCrudConfig = {
  model: 'usuariosPermisos',
  path: '/usuarioPermiso'
}

const listModels = [
  objUsuariosCrudConfig,
  objClientesCrudConfig,
  objComprasCrudConfig,
  objCategoriasCrudConfig,
  objEmpresasCrudConfig,
  objPermisosCrudConfig,
  objProductosCrudConfig,
  objProveedoresCrudConfig,
  objVentasCrudConfig,
  objusuariosPermisosCrudConfig
];


const objCrudConfig = {
  register: CrudX,
  options: {
    name: Config.sequelize.database,
    modelsConfig: listModels
  }
}

server.log('info', 'Server running at: ' + server.info.uri);

server.register([objDatabaseConfig], (objError) => {

  server.register([objCrudConfig], (objError) => {
    if (objError) {
      throw objError;
    }


    server.start((objError) => {
      server.register([objUsersModule], { routes: { prefix: '/users' } }, (objError) => {
        server.table()[0].table.forEach((route) => console.log(`${route.method}\t${route.path}`));

        if (objError) {
            throw objError;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
      });
    });
  });
  
});





