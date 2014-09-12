var url='http://jsonp.jit.su/?url=http%3A%2F%2F181.48.24.156%3A8183%2FServicios%2Fapi%2FConsumidor%2FFilter%2F';
function ValidarLogin() {
	var datosUsuario = $("#nombredeusuario").val();
	var datosPassword = $("#clave").val();	
	var NameServicio="";
	$.ajax({ // ajax call starts
          url: url+datosUsuario+'%2F'+datosPassword+'', // JQuery loads serverside.php 
          dataType: 'json', // Choosing a JSON datatype		   
          success: function(data) // Variable data contains the data we get from serverside
          {
			  if(data!=""){
				 $.mobile.changePage("#home");
                 ListarEventos(data);		
			  }
			  else{
				alert("El usuario o la clave no son validas");
			  }	   
          },
		  error: function(data){
		       alert("El usuario o la clave no son validas");
		  }
      });
}
function ListarEventos(data){
 var i=0;
	 //Listamos los eventos que tiene esta persona disponibles
	 while (i < data.Derechos.length){
		 NameServicio=data.Derechos[i].DesServicio;
		  if (NameServicio !== null) {
			  $("#coreeventos").append('<li data-section="Widgets" data-filtertext="selectmenus custom native multiple optgroup disabled forms" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="false" data-iconpos="right" data-theme="d" class="ui-btn ui-btn-up-d ui-btn-icon-right ui-li-has-arrow ui-li"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#menucontrolscan" class="ui-link-inherit">'+NameServicio+'</a></div></div></li>');     
		  }
		 i=i+1;
   }
}