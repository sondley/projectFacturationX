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

	function CodigoBarra(_codigo_b){
		
		//console.log("el correo es : ",_correo);
    return objSequelize.models.Productos.findOne({
   	 	where:{
      		codigo_b:_codigo_b
   	 	}
   	});
  }

  function _create (_numero_venta,_vendedor,_moneda,_subtotal,_total_iva,_cliente_id,_total,_tipo_pago,_descuento,_importe,productos) {
    
    var putData = {
   numero_venta :_numero_venta,
    vendedor :_vendedor,
    moneda :_moneda,
    subtotal :_subtotal,
    total_iva :_total_iva,
    total :_total,
    tipo_pago :_tipo_pago,
    descuento :_descuento,
    cantidad :productos.cantidad,
    importe :_importe,
    cliente_id :_cliente_id,
    producto_id :productos.producto_id

  };

  
  return objSequelize.models.Ventas.create(putData).
  }


  function _execute(objRequest){
    
    var numero_venta = objRequest.payload.numero_venta,
          vendedor = objRequest.payload.vendedor,
          moneda = objRequest.payload.moneda,
          subtotal = objRequest.payload.subtotal,
          total_iva = objRequest.payload.total_iva,
          total = objRequest.payload.total,
          tipo_pago = objRequest.payload.tipo_pago,
          descuento = objRequest.payload.descuento,
          importe = objRequest.payload.importe,
          cliente_id = objRequest.payload.cliente_id;


          

          var productos= objRequest.payload.productos;
          var lengthProduct= productos.length;
          console.log(lengthProduct);

          productos.forEach(function(element) {
           console.log(element);
            _create(numero_venta,vendedor,moneda,subtotal,total_iva,cliente_id,total,tipo_pago,descuento,importe,element)
            console.log(element);
          });
  }

  function _login(_correo) {
    return objSequelize.models.Usuarios.findOne({
      where:{
        correo:_correo
      }
    }).then(users=>{

      return users;
    })
  }


	return {
	    _create,
	    login,
      _login,
		CodigoBarra,
    _execute
	    
	}
}



  

  

module.exports = MakeUsersHandler;
