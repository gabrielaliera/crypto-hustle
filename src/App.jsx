import { useState, useEffect } from 'react'
import './App.css'
import CoinInfo from "./Components/coinInfo";
import SideNav from "./Components/sideNav";

//import { Input } from "semantic-ui-react";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {

    const fetchAllCoinData = async () => {
      const response = await fetch("https://min-api.cryptocompare.com/data/all/coinlist?&api_key" + API_KEY);
      const json = await response.json();
      setList(json);
    };

    //Calls functions and handles error
    fetchAllCoinData().catch(console.error);

  }, []);

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) => 
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };
  
  return (
    <div className="whole-page">
      <SideNav/>
      <h1>My Crypto List</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <ul>
          {searchInput.length > 0
          ? filteredResults.map((coin) => 
                list.Data[coin].PlatformType === "blockchain" ? 
                <CoinInfo
                  image={list.Data[coin].ImageUrl}
                  name={list.Data[coin].FullName}
                  symbol={list.Data[coin].Symbol}
                />
                : null
            )
          : list && Object.entries(list.Data).map(([coin]) => 
                list.Data[coin].PlatformType === "blockchain" ? 
                <CoinInfo
                  image={list.Data[coin].ImageUrl}
                  name={list.Data[coin].FullName}
                  symbol={list.Data[coin].Symbol}
                />
                : null
             )}
        </ul>
        

    </div>
  )
}

export default App
