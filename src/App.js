import React,{useEffect,useState} from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';
import './App.css';


function App() {

 const [coin, setcoin] = useState([])
 const [Search,SetSearch]= useState('')

const handlechange=(e)=>{
  SetSearch(e.target.value);
}



useEffect(() => {
       axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
       .then(
         coins =>{
           console.log(coins.data)
           setcoin(coins.data)
         }
       )
    
},[]);




  const filteredCoins = coin.filter(coin =>
    coin.name.toLowerCase().includes(Search.toLowerCase())
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a Currency</h1>
        <form>
          <input type="text" placeholder="Input Currency Name Here"  className="coin-input" onChange={handlechange}></input>
        </form>
       
      </div>
  
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
