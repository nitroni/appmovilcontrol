function ValidarLogin() {
	var datosUsuario = $("#nombredeusuario").val();
	var datosPassword = $("#clave").val();	
	var NameServicio="";
	var url='http://181.48.24.156:8183/Servicios/api/Proveedor/Filter/?id='+datosUsuario+'sx&clave='+datosPassword+'';	
	$.ajax({ // ajax call starts
          url: url, // JQuery loads serverside.php 
		  type:"GET",
          dataType: 'json', // Choosing a JSON datatype		   
          success: function(data) // Variable data contains the data we get from serverside
          {
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
		  if (NameServicio !== null) {
			  $("#coreeventos").append('<li data-section="Widgets" data-filtertext="selectmenus custom native multiple optgroup disabled forms" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="false" data-iconpos="right" data-theme="d" class="ui-btn ui-btn-up-d ui-btn-icon-right ui-li-has-arrow ui-li"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#menucontrolscan" class="ui-link-inherit">'+NameServicio+'</a></div></div></li><br>');     
		  }
		 i=i+1;
   }
}