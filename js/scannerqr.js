function scanQR(){
var scanner = cordova.require("cordova/plugin/BarcodeScanner");
scanner.scan(
    function (result) 
	{
	  document.getElementById("cedula").value=result.text;
	  document.getElementById("resultado").value="valida";
    }, 
        function (error) 
	    {
            alert("Scanning failed: " + error);
        }
    );
};

/* Helper for this example that hides all four pages */
function hideAllPages()
{
	document.getElementById('page1').style.visibility = 'hidden';
	document.getElementById('page2').style.visibility = 'hidden';
	document.getElementById('page3').style.visibility = 'hidden';		
	document.getElementById('page4').style.visibility = 'hidden';
}