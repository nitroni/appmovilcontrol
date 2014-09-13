function scanQR(){
var scanner = cordova.require("cordova/plugin/BarcodeScanner");
var resulval;
var resulret;
scanner.scan(
    function (result) 
	{
	  resulval=validarqr(result.text);
	  if(resulval=="si"){
	    resulret="Usuario valido";
	  }
	  if(resulval=="no"){
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
/* Helper for this example that hides all four pages */
/*function hideAllPages()
{
	document.getElementById('page1').style.visibility = 'hidden';
	document.getElementById('page2').style.visibility = 'hidden';
	document.getElementById('page3').style.visibility = 'hidden';		
	document.getElementById('page4').style.visibility = 'hidden';
}*/