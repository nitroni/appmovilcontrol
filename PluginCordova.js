window.echo = function(str, callback) {
  cordova.exec(
    callback,
    function(err) { callback('Nothing to echo.'); },
    "MyPhonegapInterface",
    "echo",
    [str]
  );
};