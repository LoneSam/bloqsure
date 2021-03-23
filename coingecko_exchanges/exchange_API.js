const exchanges = require("./tickers.js");
const http = require('http');

var app = http.createServer(function(req,res){
    console.log('req.method: ' + req.method);   // 'GET'
    console.log('req.url: ' + req.url);         // '/tickers/bitcoin'
    //console.log('req.url.path: ' + req.url.path);

    res.setHeader('Content-Type', 'application/json');
    
    let [dir, coin]= req.url.slice(1).split('/'); //[tickers, bitcoin]
    if (dir === 'tickers') {
        (async () => {
            tickers = await exchanges.Main(coin);
            module.exports = tickers;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(tickers));//JSON.stringify(exchanges.getCoins('bitcoin')));
        })();
    }
    /*
    if (req.url.slice(1) === 'bitcoin') { // take off the     
        res.end(JSON.stringify({a: '1234abcd'}));
    }
    */
  
    
   });
app.listen(3000);