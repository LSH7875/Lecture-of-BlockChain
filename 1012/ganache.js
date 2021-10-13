var ganache = require("ganache-cli");
var server = ganache.server();
server.listen(8546, function(err, blockchain) {
    console.log(`listen`)
});