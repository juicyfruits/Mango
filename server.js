	var server = require('http').createServer()
    		, WebSocketServer = require('ws').Server
      		, wss = new WebSocketServer({ server: server })
        	, express = require('express')
	  	, app = express()
	    	, port = 8080
	      	, path = require('path');

	app.use( function ( req, res ) {
		res.sendFile( path.resolve( 'index.html' ) );
	});

	wss.on( 'connection', function connection( ws ) {
		ws.on('message', function incoming( message ) {
			console.log( 'received: %s', message );
			wss.clients.forEach( function each( client ) {
				client.send( message );
			});
		});
	});

	server.on( 'request', app );
	server.listen( port, function () { 
		console.log( 'Alive and kicking on ' + port ); 
	} );
