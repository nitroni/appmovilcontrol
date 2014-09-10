function scanQR(){
var scanner = cordova.require("cordova/plugin/BarcodeScanner");
scanner.scan(
    function (result) 
	{
		hideAllPages();
		alert("dato=="+result.text);
	    if(result.text == "page2")
	    {
	        document.getElementById('page2').style.visibility = 'visible';
	        window.location.hash="#page2";
	    }
	    else if(result.text == "page3")
	    {
	        document.getElementById('page3').style.visibility = 'visible';			
	        window.location.hash="#page3";
	    }
	    else if(result.text == "page4")
	    {
	        document.getElementById('page4').style.visibility = 'visible';			
	        window.location.hash="#page4";
	    }
		else
		{
            alert("Not a valid QR Code for this application="+result);
		}
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