function ValidarLogin() {
    $.post('http://php52.secuencia24.com/mememovil/lib/get_all_pais.php',              
     function(data){
           if (data != "[]") {
			   var ps_nombre="";
			   var ps_id="";
			   var i=0;
			   var valores = JSON.parse(data);  
			   $("#idubi").append('<option value="1" selected="selected">Seleccione Pais</option>');
			   while (i<valores.length){
				     ps_nombre=valores[i]["ps_nombre"];
					 ps_id=valores[i]["ps_id"];
					  if (ps_nombre !== null) {
                          $("#idubi").append('<option value="' + ps_id + '">' + ps_nombre + '</option>');     
                      }
					 i=i+1;
			   }
           }
           return false;
    });
}
function CargarEventos(idussr) {
                $.post('http://php52.secuencia24.com/mememovil/lib/get_departamento.php', {idussr : idussr},
                function(data){
                        if (data != "[]") {
							   var dp_nombre="";
							   var dp_id="";
							   var i=0;
							   var valores = JSON.parse(data); 
							   $("#depart").append('<option value="0" selected="selected">Seleccione región..</option>');
							   while (i<valores.length){
									 dp_nombre=valores[i]["dp_nombre"];
									 dp_id=valores[i]["dp_id"];
									  if (dp_nombre !== null) {
										  $("#depart").append('<option value="' + dp_id + '">' + dp_nombre + '</option>');     
									  }
									 i=i+1;
							   }            
                        }
                          return false;
                 });
}
$(document).ready(function () {
    cargarPaises();
     $( "#idubi" ).change(function() {
        var idPais = $("#idubi").val();   
        $("#depart").html('');
        cargarDepartamentos(idPais);
     });
});