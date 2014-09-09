// Javascript for index.html
// Requires: 
// <script type="text/javascript" charset="utf-8" src="phonegap.0.9.4.js"></script>
// <script type="text/javascript" charset="utf-8" src="jquery-1.5.1.min.js"></script>
// <script type="text/javascript" charset="utf-8" src="webintent.js"></script>
// <script type="text/javascript" charset="utf-8" src="barcodescanner.js"></script>

//check we have set up scripts and JQuery OK
$(document).ready(function() {
	//alert('Ready (index.js)...');
	//alert('ready, window.plugins='+window.plugins+', barcodeScanner='+window.plugins.barcodeScanner);

});

//test opening the onboard map application (using a geo: URL).
//Same function can open the standard browser - just change the URL.
function testMap() {
	//alert('test1, webintent='+window.plugins.webintent);
	window.plugins.webintent.startActivity({
		action: WebIntent.ACTION_VIEW,
		url: 'geo:0,0'}, 
		function() {}, 
		function() {alert('Failed to open URL via Android Intent');}
	);
	//alert('done test2');
}

//test opening the 2D barcode scanner (see http://code.google.com/p/zxing/)
//With an internet connection the plugin should prompt to install the scanner if not
//already present.
function testScan() {
	//window.plugins.barcodeScanner.scan( BarcodeScanner.Type.QR_CODE, function(result) {
		//alert("We got a barcode: " + result);
		
		//document.getElementById("cedula").value=result;
		//document.getElementById("resultado").value="Cedula valida";
		
		//window.App.customFunctionCalled();
		
	    window.echo("echome", function(echoValue) {
		         console.log("AQUI 2");
                 navigator.notification.alert(echoValue == "echome"); // should alert true.
        });
}

// End
