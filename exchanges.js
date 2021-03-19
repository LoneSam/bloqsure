const CoinGecko= require('coingecko-api');

const cgcli = new CoinGecko();
var main = async() => {
    const data = await cgcli.exchangeRates.all();
    const exchange_rates = data.data.rates; 
    for(coin in exchange_rates){
        console.log(exchange_rates[coin]);
    }
}

main();