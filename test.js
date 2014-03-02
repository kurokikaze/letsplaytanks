var nes = require('node-nes')({});
var fs = require('fs');
var http = require('http');

var self = nes.ui;
fs.readFile('battlecity.nes', {'encoding' : 'binary'}, function(err, data) {
	if (err) { return err; }
	// console.log(nes);
	self.nes.loadRom(data);
	self.nes.start();

	console.log('Enable', self.nes.isRunning);
    self.enable();
    console.log('Done!');
    var canvas = self.nes.ui.screen[0];
    //console.log(self.nes.ui.canvasImageData);
    console.log(self.nes.frameTime);

    http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(''
            + '<meta http-equiv="refresh" content="1;" />'
            + '<img src="' + canvas.toDataURL() + '" />');
    }).listen(3000);
    console.log('Server started on port 3000');
});

