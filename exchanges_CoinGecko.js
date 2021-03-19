const request = require('request');
const fs = require('fs');
const path = require('path');
var sqlite3 = require('sqlite3').verbose();

const writeExchanges = (tickers) => {

    let prices = {};
    
    for (const ticker in tickers) {
        const exchange = tickers[ticker].market.name;
        const price = tickers[ticker].converted_last.usd;
        prices[exchange] = price;
        
    }

    let max = 0;
    let max_name = '';
    for (const p in prices) {
        if (max < prices[p]) {
            max = prices[p];
            max_name = p;
        }
    }

    //console.log(max);
    //console.log(max_name);

    let min = Number.MAX_VALUE;
    let min_name = '';
    
    for (const p in prices) {
        if (min > prices[p]) {
            min = prices[p];
            min_name = p;
        }
    }
    //console.log(min);
    //console.log(min_name);

    let data = ''
   
    for (p in prices) {
        data += p + ', ';
    }

    data += '\n';

    /*
    fs.appendFile(path.join(__dirname,'CoinGeckoData.csv'), data, 'utf8', (err) => {
        if(err) throw err;
    }
    
    );
    */

    data = ''
}

const sortExchanges = (exchanges) => {
    exchanges.sort( (a,b) => {
        return a.converted_last.usd - b.converted_last.usd;
    });
    exchanges.forEach( (e) => { 
       // console.log(`${e.market.name} : ${e.converted_last.usd}`);
    });

}

const initializeDB = () => {
    var db = new sqlite3.Database('coingecko');

    db.serialize(function() {
        db.run("CREATE TABLE exchanges (dt TEXT, name TEXT, price INT, coin TEXT)");
    });
}

const printExchanges = () => {
    var db = new sqlite3.Database('coingecko');

    db.serialize(function() {
        db.each("SELECT dt, name, price, coin FROM exchanges", function(err, row) {
            console.log(row.dt, row.name, row.price, row.coin);
        });
    });
}

const copy2DB = (exchanges, coin) => {
    var db = new sqlite3.Database('coingecko');

    db.serialize(function() {
        var d = new Date();

        var stmt = db.prepare("INSERT INTO exchanges VALUES (?,?,?,?)");
    
        exchanges.forEach( (e) => { 
            stmt.run(d, e.market.name, e.converted_last.usd * 100, coin);
           // console.log(`${e.market.name} : ${e.converted_last.usd}`);
        });
        
        /*
        for (var i = 0; i < exchanges.length; i++) {
            stmt.run(i, n, exchanges[i].market.name, exchanges[i].converted_last.usd * 100);
        }
        */
        stmt.finalize();
    });

    db.close();
}


const coin2DB = (coin) => {
    request('https://api.coingecko.com/api/v3/coins/'+coin, { json: true }, (err, res, body) => {
    if (err) throw err;
        //console.log(body.tickers);
        //writeExchanges(body.tickers);
        //sortExchanges(body.tickers);
        count++;
        copy2DB(body.tickers, coin);
        console.log('Run #' + count);
        //printExchanges();

    });
}

const getCoins = (requrl) => {
    if (requrl === 'bitcoin') 
l
    coins.forEach((coin) => {
        coin2DB(coin);  
    });
}
//initializeDB();
count = 0;
setInterval(getCoins, 5000);