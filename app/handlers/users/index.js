'use strict';


const Boom = require('boom');
const Handler = require('./handler');
const Config = require('../../../config');
const Joi = require('joi');




// var UploadFiles = require('../../prehandlers/upload-files');


////////////////////////////////////////////////////////////


function UsersModule(objServer, objOptions, fnNext) {
  const objSequelize = objServer.plugins['hapi-sequelize'][Config.sequelize.database];
  const objUserHandler = Handler(objSequelize);
  objServer.route([
    
    {
      method: 'POST',
      path: '/login',
      // auth: false,
    config: {
        auth: false,
        handler: async function (objRequest, fnReply) {
          const _correo = objRequest.payload.correo;
          //console.log(_correo);

            //console.log("hoe");
            const objUser = await objUserHandler.login(_correo);
            if (objUser == null){
              fnReply({ statusCode: 200, results: "Usuario no encontrado" });
            }else{

            const _objUser = Object.assign({}, { id: objUser.dataValues.id, nombres: objUser.dataValues.nombres, appelidos: objUser.dataValues.appelidos, cedula: objUser.dataValues.cedula,telefono: objUser.dataValues.telefono, direccion: objUser.dataValues.direccion,usuario: objUser.dataValues.usuario });
            

          
              if(objUser.dataValues.password==objRequest.payload.password){

                if(objUser.dataValues.estado=='1'){
                  fnReply({ statusCode: 200, results: _objUser });
                }else{
                  fnReply({ statusCode: 200, results: "estado no esta activo" });
                }
            }else{
              fnReply({ statusCode: 200, results: "_contrasena Incorecta" });
            }
          }

            
          //}).catch((objError) => {

            //fnReply(Boom.badImplementation('Invalid Data'));
         // });
        //},
      
         
        
      }
    }
  },
    {


      method: 'POST',
      path: '/signup',
      config: {
        auth: false,
        //TODO: Refactor JOI validation
        handler: async function (objRequest, fnReply) {
          objUserHandler._login(objRequest.payload).then((objUser) => {
            fnReply({ statusCode: 201, results: objUser }).code(201);
          }).catch((objError) => {
            console.log(objError);
            if (objError.name == 'SequelizeUniqueConstraintError') {
              return fnReply(Boom.conflict(objError.errors[0].message));
            }

            fnReply(Boom.badImplementation('Invalid Data'));
          });
        }
      }
    },
    {


      method: 'POST',
      path: '/ventas',
      config: {
        auth: false,
        //TODO: Refactor JOI validation
        handler: async function (objRequest, fnReply) {
          const objUser = await objUserHandler._execute(objRequest);
          
          if (objUser != null){
          
            fnReply({ statusCode: 200, results: "Exitoso Creado" }).code(200);
          }else{
              fnReply({ statusCode: 200, results: "Exitoso Creado" }).code(200);
            }
          }
        }
    },
    {


      method: 'POST',
      path: '/compras',
      config: {
        auth: false,
        //TODO: Refactor JOI validation
        handler: async function (objRequest, fnReply) {
          const objUser = await objUserHandler._executeCompras(objRequest);
          
          if (objUser != null){
          
            fnReply({ statusCode: 200, results: "Exitoso Creado" }).code(200);
          }else{
              fnReply({ statusCode: 200, results: "Exitoso Creado" }).code(200);
            }
          }
        }
    },
    {
      method: 'POST',
      path: '/codigoBarra',
      // auth: false,
      config: {
        auth: false,
        handler: async function (objRequest, fnReply) {
          const _codigo_b = objRequest.payload.codigo_b;
          const objProduct = await objUserHandler.CodigoBarra(_codigo_b);
            if (objProduct == null){
              fnReply({ statusCode: 200, results: "Producto no encontrado" });
            }else{
                if(objProduct.dataValues.estado=='1'){
                  fnReply({ statusCode: 200, results: objProduct });
                }else{
                  fnReply({ statusCode: 200, results: "estado no esta activo" });
                }
            }
        }
      }
    }
    

  ]);

  fnNext();
  
};


////////////////////////////////////////////////////////////


exports.register = UsersModule;

exports.register.attributes = {
  name: 'Users'
};
