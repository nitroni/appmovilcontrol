//Core proveedor
var url='http://jsonp.jit.su/?url=http%3A%2F%2F181.48.24.156%3A8183%2FServicios%2Fapi%2FProveedor%2FFilter%2F%3Fid%3D';
function ValidarLogin() {

	var datosUsuario = $("#nombredeusuario").val();
	var datosPassword = $("#clave").val();	
	var NameServicio="";
	$.ajax({ // ajax call starts
          url: url+datosUsuario+'sx%26clave%3D'+datosPassword+'', // JQuery loads serverside.php 
		  
          dataType: 'json', // Choosing a JSON datatype		   
          success: function(data) // Variable data contains the data we get from serverside
          {
		  alert("entro consulta");
			  if(data.NomProveedor !== null){
			     $('#coreeventos').empty();
				 $.mobile.changePage("#home");
                 ListarEventos(data);		
			  }
			  else{
				alert("El usuario o la clave no son validas");
			  }	   
          },
		  error: function(data){
		       alert("El usuario o la clave no son validas error");
		  }
      });
}
function ListarEventos(data){
 var i=0;
 //Se limpia el contenido
	 //Listamos los eventos que tiene esta persona disponibles
	 while (i < data.Servicios.length){
		 NameServicio=data.Servicios[i].DesServicio;
		  if (NameServicio !== null) {
			  $("#coreeventos").append('<li data-section="Widgets" data-filtertext="selectmenus custom native multiple optgroup disabled forms" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="false" data-iconpos="right" data-theme="d" class="ui-btn ui-btn-up-d ui-btn-icon-right ui-li-has-arrow ui-li"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#menucontrolscan" class="ui-link-inherit">'+NameServicio+'</a></div></div></li><br>');     
		  }
		 i=i+1;
   }
}