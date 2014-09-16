var NameServicio="";
var itemevento=0;
var tiposervicio="";
var datosUsuario="";
var datosPassword="";
var codigoservicio="";
var datosg;
var tiposervice="";
var estado='no';
var nitproveedor="";
var detfechainiserv="";
var detfechafinserv="";
var detcapaserv="";
var capservicio="";
var conteventotal="";

var sitePath = 'http://181.48.24.156:8183/Servicios/api';

function ValidarLogin() {
datosUsuario = $("#nombredeusuario").val();
datosPassword = $("#clave").val();	
if(datosUsuario!="" && datosPassword!=""){
	var url= sitePath + '/Proveedor/Filter/?id='+datosUsuario+'&clave='+datosPassword+'';		
		$.ajax({ // ajax call starts
			  url: url, // JQuery loads serverside.php 
			  type:"GET",
			  dataType: 'json', // Choosing a JSON datatype
			  timeout: 5000,	
			  crossDomain: true,		  
			  success: function(data) // Variable data contains the data we get from serverside
			  {
				  datosg=data;
				  if(data.NomProveedor != null){
					 $('#coreeventos').empty();
					 $.mobile.changePage("#home");
					  ListarEventos(data);		
				  }
				  else{
					alert("El usuario o la clave no son validos");
				  }	   
			  },
			  error: function(data){
				   alert("Error de conexión");
			  }
		  });
	  }
	  else{
	      alert("Los campos no pueden estar en blanco");
	  }
}
function ListarEventos(data){
 var i=0;
	 while (i < data.Servicios.length){
		 NameServicio=data.Servicios[i].DesServicio;
		 codigoservicio=data.Servicios[i].CodServicio;
		 nitproveedor=data.Servicios[i].NitProveedor;
		 detfechainiserv=data.Servicios[i].RanIniDisServicio;
         detfechafinserv=data.Servicios[i].RanFinDisServicio;
         detcapaserv=data.Servicios[i].CapServicio;
		 tiposervicio="c";
		  if(NameServicio=="Restaurante"){
		     tiposervicio="r";
		  }
		  if (NameServicio !== null) {
			  $("#coreeventos").append('<li data-section="Widgets" data-filtertext="selectmenus custom native multiple optgroup disabled forms" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="false" data-iconpos="right" data-theme="d" class="ui-btn ui-btn-up-d ui-btn-icon-right ui-li-has-arrow ui-li"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><button id = "vcedu"  onclick="opcionservicio('+"'"+codigoservicio+"'"+',tiposervicio,'+"'"+nitproveedor+"'"+','+"'"+detcapaserv+"'"+');" class="ui-btn-text">'+NameServicio+'</button></div><button id = "vcedu"  onclick="detalleservicio('+"'"+detfechainiserv+"'"+','+"'"+detfechafinserv+"'"+','+"'"+detcapaserv+"'"+');" >Detalle</button></div></li><br>');     
		  }
		 i=i+1;
   }
}
function opcionservicio(cdv,tip,nitpro,cap){   
     cdv.replace(' ','');
	 tiposervice=cdv;
	 nitproveedor=nitpro;
	 capservicio=cap;
     cargarcontador(cdv,tip);
     $.mobile.changePage("#menucontrolscan");	 
}
function detalleservicio(fechainicio,fechafin,capacidad){
	 $("#detalle1").text('Fecha de inicio del servicio: '+fechainicio+'');
	 $("#detalle2").text('Fecha de finalización del servicio: '+fechafin+'');
	 $("#detalle3").text('Capacidad: '+capacidad+'');
	 $.mobile.changePage("#detalle");
}
function cargarcontador(cdv,tip) {
var url= sitePath + '/Proveedor/Filter/?id='+datosUsuario+'&clave='+datosPassword+'';	
	$.ajax({ // ajax call starts
          url: url, // JQuery loads serverside.php 
		  type:"GET",
          dataType: 'json', // Choosing a JSON datatype
          timeout: 5000,	
          crossDomain: true,		  
          success: function(data) // Variable data contains the data we get from serverside
          {   
		      //$('#datoscontador').empty();
			  $('.cont').empty();
              Mostrarcontador(data,cdv);		
          },
		  error: function(data){
		       alert("Error en la conexión");
		  }
      });
}
//Muestra el contador de inicio
function Mostrarcontador(datam,codiserv){
	var i=0;
	var total=0;
	while (i < datam.Servicios.length){
		  if (datam.Servicios[i].CodServicio == codiserv) {
		     total=(datam.Servicios[i].ConEntradas-datam.Servicios[i].ConSalidas);
			 //$("#datoscontador").append('<ul><li><a href="">Entradas: '+datam.Servicios[i].ConEntradas+'</a></li><li><a href="">Salidas: '+datam.Servicios[i].ConSalidas+'</a></li><li><a href="">Total evento: '+total+'</a></li></ul>');
	          $("#datoscontador1").text('Entradas: '+datam.Servicios[i].ConEntradas+'');
			  $("#datoscontador2").text('Salidas: '+datam.Servicios[i].ConSalidas+'');
			  $("#datoscontador3").text('Total evento: '+total+'');
	          $("#datconuno1").text('Entradas: '+datam.Servicios[i].ConEntradas+'');
	          $("#datconuno2").text('Salidas: '+datam.Servicios[i].ConSalidas+'');
	          $("#datconuno3").text('Total evento: '+total+''); 
              $("#contegresar1").text('Entradas: '+datam.Servicios[i].ConEntradas+'');
	          $("#contegresar2").text('Salidas: '+datam.Servicios[i].ConSalidas+'');
	          $("#contegresar3").text('Total evento: '+total+''); 	 
			  	 
		  }
		 i=i+1;
    }           			  			  				
}
function validarqr(codigoqr) {
if(codigoqr=="" || codigoqr=='0'){
   alert("El código QR no es válido");
   return false;
}
var fecha = new Date();
//var fechaactual=(fecha.getMonth()+1)+'/'+fecha.getDate()+'/'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
var fechaactual = GetCurrentDate(fecha);
var datosent=
{
   "NitProveedor":nitproveedor,
   "CedConsumidor":codigoqr,
   "CodServicio":tiposervice,
   "FecEntrada":fechaactual,
   "TipRegistro":"E",
   "Message":null,
   "ConRegistro":1,
   "CodProducto":""
}
//Se define la url del servicio
var url= sitePath + '/Registro/Add';	
	$.ajax({ // ajax call starts
          url: url, // JQuery loads serverside
		  type:"POST",
		  headers: { 
				 Accept : "text/plain; charset=utf-8",
				"Content-Type": "text/plain; charset=utf-8"
          },
          dataType: "json",
		  async: false,
          crossDomain: true,
          data: JSON.stringify(datosent),		  
          success: function(data) // Variable data contains the data we get from serverside
          {   
		      conteventotal=(data.ConEntradasServicio-data.ConSalidasServicio);
			  if(conteventotal<0){
			     conteventotal=0;
			  }
				  $('.cont').empty();
				  updatecounter(data.ConEntradasServicio,data.ConSalidasServicio);	
				  estado='si';
			  
			  if(conteventotal>capservicio){
			     capacidadevento(capservicio);
			  }
          },
		  error: function(data){
			   estado='no';
		  }
      });
	  return estado;
}
//Se actualiza el contador cuando existe una accion del lector qr, validar celdula y usuario anonimo
function updatecounter(entrada,salida){
       var numpersonevento=(entrada-salida);
	   if(numpersonevento<0){
	      numpersonevento=0;
	   }
	   $("#datoscontador1").text('Entradas: '+entrada+'');
	   $("#datoscontador2").text('Salidas: '+salida+'');
	   $("#datoscontador3").text('Total evento: '+numpersonevento+''); 
       $("#datconuno1").text('Entradas: '+entrada+'');
	   $("#datconuno2").text('Salidas: '+salida+'');
	   $("#datconuno3").text('Total evento: '+numpersonevento+''); 	
	   $("#contegresar1").text('Entradas: '+entrada+'');
	   $("#contegresar2").text('Salidas: '+salida+'');
	   $("#contegresar3").text('Total evento: '+numpersonevento+''); 	
}
function validarcedula(){
    var cedula=document.getElementById("numcedula").value;
	if(cedula==""){
	   alert("Por favor digite la cédula.");
	return false;
	
	}
	var fecha = new Date();
    //var fechaactual=(fecha.getMonth()+1)+'/'+fecha.getDate()+'/'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
	var fechaactual= GetCurrentDate(fecha);
	//Se arma el objeto con los parametros a enviar
	var datosentc=
	{
	   "NitProveedor":nitproveedor,
	   "CedConsumidor":cedula,
	   "CodServicio":tiposervice,
	   "FecEntrada":fechaactual,
	   "TipRegistro":"E",
	   "Message":null,
	   "ConRegistro":1,
	   "CodProducto":""
	}
   var url= sitePath + '/api/Registro/Add';	  
   $.ajax({ // ajax call starts
          url: url, // JQuery loads serverside
		  type:"POST",
		  headers: { 
				 Accept : "text/plain; charset=utf-8",
				"Content-Type": "text/plain; charset=utf-8"
          },
          dataType: "json",
		  async: false,
          crossDomain: true,
          data: JSON.stringify(datosentc),			  
          success: function(data) // Variable data contains the data we get from serverside
          {   
		      conteventotal=(data.ConEntradasServicio-data.ConSalidasServicio);
			  if(conteventotal<0){
			      conteventotal=0;
			  }
				  $('.cont').empty();
				  updatecounter(data.ConEntradasServicio,data.ConSalidasServicio);
				  estado='si';
				  alert("La cédula es valida");
			  
			  if(conteventotal>capservicio){
			      capacidadevento(capservicio);
			  }			  
          },
		  error: function(data){
			  alert("La cédula "+cedula+" no es valida");
		  }
      });
}
function validaranonimo(){
    var fecha = new Date();
    //var fechaactual=(fecha.getMonth()+1)+'/'+fecha.getDate()+'/'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
    var fechaactual = GetCurrentDate(fecha);
	var datosenta=
	{
	   "NitProveedor":nitproveedor,
	   "CedConsumidor":0,
	   "CodServicio":tiposervice,
	   "FecEntrada":fechaactual,
	   "TipRegistro":"E",
	   "Message":null,
	   "ConRegistro":1,
	   "CodProducto":""
	}
   var url= sitePath + '/Registro/Add';	
   $.ajax({ // ajax call starts
          url: url, // JQuery loads serverside
		  type:"POST",
		  headers: { 
				 Accept : "text/plain; charset=utf-8",
				"Content-Type": "text/plain; charset=utf-8"
          },
          dataType: "json",
		  async: false,
          crossDomain: true,
          data: JSON.stringify(datosenta),			  
          success: function(data) // Variable data contains the data we get from serverside
          {   
		      conteventotal=(data.ConEntradasServicio-data.ConSalidasServicio);
			  if(conteventotal<0){
			      conteventotal=0;
			  }
				  $('.cont').empty();
				  updatecounter(data.ConEntradasServicio,data.ConSalidasServicio);
				  alert("Usuario anónimo contado");
			  
			  if(conteventotal>capservicio){
			      capacidadevento(capservicio);
			  }	
          },
		  error: function(data){
		       alert("Error de conexión al servidor");
		  }
      });
}
function egresarusuarios(){
    var fecha = new Date();
    //var fechaactual=(fecha.getMonth()+1)+'/'+fecha.getDate()+'/'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
    var fechaactual = GetCurrentDate(fecha);
	var datosenta=
	{
	   "NitProveedor":nitproveedor,
	   "CedConsumidor":0,
	   "CodServicio":tiposervice,
	   "FecEntrada":fechaactual,
	   "TipRegistro":"S",
	   "Message":null,
	   "ConRegistro":1,
	   "CodProducto":""
	}
   var url= sitePath + '/Registro/Add';	
   $.ajax({ // ajax call starts
          url: url, // JQuery loads serverside
		  type:"POST",
		  headers: { 
				 Accept : "text/plain; charset=utf-8",
				"Content-Type": "text/plain; charset=utf-8"
          },
          dataType: "json",
		  async: false,
          crossDomain: true,
          data: JSON.stringify(datosenta),			  
          success: function(data) // Variable data contains the data we get from serverside
          {   
		      conteventotal=(data.ConEntradasServicio-data.ConSalidasServicio);
			  if(conteventotal<0){
			      conteventotal=0;
			  }
				  $('.cont').empty();
				  updatecounter(data.ConEntradasServicio,data.ConSalidasServicio);
				  alert("Usuario descontado");
			  
			  if(conteventotal>capservicio){
			      capacidadevento(capservicio);
			  }	
          },
		  error: function(data){
		       alert("Error de conexión al servidor");
		  }
      });
}
function capacidadevento(capev){
    alert("Se llegó al límite de la capacidad del servicio de "+capev);    
}
//Se define la función del botón cerrar sesión
function closeapp(){
    document.getElementById("nombredeusuario").value="";
	document.getElementById("clave").value="";
    $.mobile.changePage("#inicio");
}
function Trestaurante(op){
     if(op==1){
        $.mobile.changePage('#home');
		}
		if(op==2){
		   $.mobile.changePage('#menucontrolscan');
		}
}

function GetCurrentDate(fecha){
	var currentDate = (fecha.getMonth()+1)+'/'+fecha.getDate()+'/'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
	return currentDate;
}