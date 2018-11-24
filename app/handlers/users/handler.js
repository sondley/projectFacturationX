'use strict';




function MakeUsersHandler(objSequelize) {



  function login(_correo){
		
		//console.log("el correo es : ",_correo);
    return objSequelize.models.Usuarios.findOne({
   	 	where:{
      		correo:_correo
   	 	}
   	});
  }


  function _login(_correo) {
    return objSequelize.models.Usuarios.findOne({
      where:{
        correo:_correo
      }
    }).then(users=>{

      return users;

      /*const _users = users.map((objUser) => objUser.user_id);
      return objSequelize.models.Videos.findAll({
        where: {
          user_id: { in : _users}
        },
        order: [
          ['id', 'DESC']
        ],limit:5
      })*/
    })
  }


	return {
	    
	    login,
      _login
	    
	}
}



  

  

module.exports = MakeUsersHandler;
