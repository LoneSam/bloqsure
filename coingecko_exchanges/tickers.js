const CoinGecko = require('coingecko-api');

const cgcli = new CoinGecko();

//coin_id = 'bitcoin';

const sortTickers = (tickers) => {
    tickers.sort( (a,b) => {
        return a.last - b.last;
    });
    tickers.forEach( (e) => { 
       // console.log(`${e.market.name} : ${e.converted_last.usd}`);
    });

    return tickers;

}



var main = async(coin_id) => {
    let tickers = await cgcli.coins.fetchTickers(coin_id, {});
    tickers = tickers.data.tickers;
    //console.log(tickers);
    tickers = sortTickers(tickers);

    obj = {};
    var dict = []; // create an empty array

    for(t in tickers) {
        const name = tickers[t].market.name
        const price = tickers[t].last;

        dict.push({
            name: name,
            price: price
        });
        console.log(name, price );
    }
    return dict;
    //console.log(tickers);

}



//main();
exports.Main = main;