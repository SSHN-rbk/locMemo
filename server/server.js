var express = require('express');
var app = express();

//require two files here
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);
//=============================================================================
/*									Database								 */
//=============================================================================


//=============================================================================
/*									Server   								 */
//=============================================================================
var port = 3000;
app.listen(port, function () {
	console.log('...Server now listening on port ' + port);
});


module.exports = app;