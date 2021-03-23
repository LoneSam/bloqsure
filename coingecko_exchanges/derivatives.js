const CoinGecko= require('coingecko-api');

const cgcli = new CoinGecko();
var main = async() => {
    const data = await cgcli.derivatives.fetchTickers();
    console.log(data);
}

main();