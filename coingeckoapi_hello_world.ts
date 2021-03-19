const CoinGecko= require('coingecko-api');

const cgcli = new CoinGecko();
var main = async() => {
    let data = await cgcli.coins.markets();
    //console.log(data);
    const coins = data.data;
    for(coin in coins) {
        console.log(coins[coin].id,coins[coin].current_price);
    }
}

main();