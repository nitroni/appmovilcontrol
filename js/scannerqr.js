function scanQR(){
var scanner = cordova.require("cordova/plugin/BarcodeScanner");
var resulval;
var resulret;
scanner.scan(
    function (result) 
	{
	  resulval=validarqr(result.text);
    }, 
        function (error) 
	    {
            alert("Scanning failed: " + error);
        }
    );
};