http = require('http');
fs = require('fs');

var votes = [0,0,0,0,0];

server = http.createServer( function(req, res) {

    console.dir(req.param);

    if (req.method == 'POST') {
        console.log("POST");
        var body = '';
        req.on('data', function (chunk) {
            body += chunk;
            //console.log("Partial body: " + body);
        });
        req.on('end', function () {
            //console.log("Body: " + body);
            if(body == "votedsong=1") 
            {
                votes[0]++;
                console.log("voted for song1");
                console.log(votes);
            }
            if(body == "votedsong=2") 
            {
                votes[1]++;
                console.log("voted for song2");
                console.log(votes);
            }
            if(body == "votedsong=3") 
            {
                votes[2]++;
                console.log("voted for song3");
                console.log(votes);
            }
            if(body == "votedsong=4") 
            {
                votes[3]++;
                console.log("voted for song4");
                console.log(votes);
            }
            if(body == "votedsong=5") 
            {
                votes[4]++;
                console.log("voted for song5");
                console.log(votes);
            }
        });
        
        //res.writeHead(200, {'Content-Type': 'text/html'});
        //res.end('post received');

    }
    else
    {
        console.log("GET");
        var html = fs.readFileSync('index.html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    }

});

port = 3000;
host = '0.0.0.0';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);