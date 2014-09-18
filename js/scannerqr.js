function scanQR(){
var scanner = cordova.require("cordova/plugin/BarcodeScanner");
var resulval;
var resulret;
scanner.scan(
    function (result) 
	{
	  resulval=validarqr(result.text);

	   alert("resultadoretornado :"+resulval);
	  if(resulval.Estado=="si"){	  
	     resulret="Usuario valido";
		 alert("Su consumo para el día de hoy es :");
	  }
	  
	  if(resulval.Estado=="no"){
	     resulret="Usuario no valido";
	  }	
	  
	  document.getElementById("cedula").value=result.text;
	  document.getElementById("resultado").value=resulret;
	  
    }, 
        function (error) 
	    {
            alert("Scanning failed: " + error);
        }
    );
};