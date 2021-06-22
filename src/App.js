import './App.css';
import React,{ useState,useEffect} from 'react';
import axios from 'axios';
import Coin from './Coin';

function App() {
  const [coins,setCoin] = useState([]);
  const [search,setSearch] = useState('');

  useEffect(() => {
   axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
   .then(res => {
    setCoin(res.data)
    console.log(res.data)
   }).catch(error => alert('You Get Some Error Bro'));
  }, [])

  const handleOnchange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLocaleLowerCase()))
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a Coin</h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleOnchange}/>
        </form>
      </div>
      {filteredCoins.map(coin => {
        return(
          <Coin key={coin.id} 
          name={coin.name}
          image={coin.image}
          price={coin.current_price} 
          symbol={coin.symbol} 
          marketcap={coin.market_cap} 
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
          />
        )
      })}
    </div>
  );
}

export default App;
