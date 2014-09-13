var NameServicio="";
var itemevento=0;
var tiposervicio="";
var datosUsuario="";
var datosPassword="";
var codigoservicio="";
var datosg;
function ValidarLogin() {
datosUsuario = $("#nombredeusuario").val();
datosPassword = $("#clave").val();	
var url='http://181.48.24.156:8183/Servicios/api/Proveedor/Filter/?id='+datosUsuario+'sx&clave='+datosPassword+'';		
	$.ajax({ // ajax call starts
          url: url, // JQuery loads serverside.php 
		  type:"GET",
          dataType: 'json', // Choosing a JSON datatype		   
          success: function(data) // Variable data contains the data we get from serverside
          {
		      datosg=data;
			  if(data.NomProveedor != null){
			     $('#coreeventos').empty();
				 $.mobile.changePage("#home");
                  ListarEventos(data);		
			  }
			  else{
				alert("El usuario o la clave no son validas");
			  }	   
          },
		  error: function(data){
		       alert("El usuario o la clave no son validas: error de conexion");
		  }
      });
}
function ListarEventos(data){
 var i=0;
	 while (i < data.Servicios.length){
		 NameServicio=data.Servicios[i].DesServicio;
		 codigoservicio=data.Servicios[i].CodServicio;
		 tiposervicio="c";
		  if(NameServicio=="Restaurante"){
		     tiposervicio="r";
		  }
		  if (NameServicio !== null) {
			  $("#coreeventos").append('<li data-section="Widgets" data-filtertext="selectmenus custom native multiple optgroup disabled forms" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="false" data-iconpos="right" data-theme="d" class="ui-btn ui-btn-up-d ui-btn-icon-right ui-li-has-arrow ui-li"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><button id = "vcedu"  onclick="opcionservicio('+"'"+codigoservicio+"'"+',tiposervicio);">'+NameServicio+'</button></div></div></li><br>');     
		  }
		 i=i+1;
   }
}
function opcionservicio(cdv,tip){   
     cdv.replace(' ','');
     cargarcontador(cdv,tip);
     $.mobile.changePage("#menucontrolscan");
}
function cargarcontador(cdv,tip) {
var url='http://181.48.24.156:8183/Servicios/api/Proveedor/Filter/?id='+datosUsuario+'sx&clave='+datosPassword+'';	
	$.ajax({ // ajax call starts
          url: url, // JQuery loads serverside.php 
		  type:"GET",
          dataType: 'json', // Choosing a JSON datatype		   
          success: function(data) // Variable data contains the data we get from serverside
          {   
		      $('#datoscontador').empty();
              Mostrarcontador(data,cdv);		
          },
		  error: function(data){
		       alert("Error en la conexion");
		  }
      });
}
function Mostrarcontador(datam,codiserv){
	var i=0;
	var total=0;
	while (i < datam.Servicios.length){
		  if (datam.Servicios[i].CodServicio == codiserv) {
		     total=(datam.Servicios[i].ConEntradas-datam.Servicios[i].ConSalidas);
			 $("#datoscontador").append('<li><a href="">Entradas: '+datam.Servicios[i].ConEntradas+'</a></li><li><a href="">Salidas: '+datam.Servicios[i].ConSalidas+'</a></li><li><a href="">Total evento: '+total+'</a></li>'); 
		  }
		 i=i+1;
    }           			  			  				
}
function validarqr(codigoqr) {
var url='http://181.48.24.156:8183/Servicios/api/Registro/Add';	
	$.ajax({ // ajax call starts
          url: url, // JQuery loads serverside.php 
		  type:"GET",
          dataType: 'json', // Choosing a JSON datatype	
          data: '{"NitProveedor": 999999999.0,"CedConsumidor": 0,"CodServicio": "SRV001","FecEntrada": "01/01/2014 09:08:03","TipRegistro": "S","Message": null,"ConRegistro": 50, "CodProducto" : ""}',		  
          success: function(data) // Variable data contains the data we get from serverside
          {   
		      $('#datoscontador').empty();
              Mostrarcontador(data,cdv);		
          },
		  error: function(data){
		       alert("Error en la conexion");
		  }
      });
}