function closeapp(){
    document.getElementById("nombredeusuario").value="";
	document.getElementById("clave").value="";
    $.mobile.changePage("#inicio");
}
$('#formulario').submit(function() { 		 
	//Se capturan los valores ingresados por el usuario
	var datosUsuario = $("#nombredeusuario").val()
	var datosPassword = $("#clave").val()
	
	if(datosUsuario=="nexos" && datosPassword=="nexos"){
	  document.getElementById("cedula").value="";
	  document.getElementById("resultado").value="";
	  $.mobile.changePage("#home");	  
	}
	else{
	  alert("El usuario no es valido intenta de nuevo!");
	}
	return false;
})
function validarcedula(){
     alert("Este usuario tiene acceso");
	 document.getElementById("numcedula").value="";
}
function egresarusuarios(){
     alert("1 usuario fuera del evento");
}