var http=require('http');

http
    .createServer(function(req,res){
        res.writeHead(200,{
            'Content-Thpe':'text/plain',
        })
        res.write("sdasd");
        res.end();
    })
    .listen(2015);
