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
            //console.log("---------",objUser);
            
            //console.log("hi");
          
          //return objUserHandler.login(_correo).then((objUser) => {
            //console.log("La contrasena es : ",objUser.dataValues.password);
            if (objUser == null){
              //console.log("helooo");
              fnReply({ statusCode: 200, results: "Usuario no encontrado" });
            }else if(objUser.dataValues.password==objRequest.payload.password){
              fnReply({ statusCode: 200, results: objUser });
            }else{
              fnReply({ statusCode: 200, results: "_contrasena Incorecta" });
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
        handler: function (objRequest, fnReply) {
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
    }
    

  ]);

  fnNext();
  
};


////////////////////////////////////////////////////////////


exports.register = UsersModule;

exports.register.attributes = {
  name: 'Users'
};
