import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;



const CoinInfo = ({ image, name, symbol, index}) => {
    const [price, setPrice] = useState(null);
  
    useEffect(() => {
      const getCoinPrice = async () => {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=` + API_KEY
        );
        const json = await response.json();
        setPrice(json);
      };
      getCoinPrice().catch(console.error);
    }, [symbol]);
  
      return (
        <div>
          {price ? ( // rendering only if API call actually returned us data
            <li className="main-list" key={index}>
              <img
                className="icons"
                src={`https://www.cryptocompare.com${image}`}
                alt={`Small icon for ${name} crypto coin`}
              />
              <Link
                style={{ color: "white" }}
                to={`/coinDetails/${symbol}`}
                key={symbol}
              >
               {name} <span className="tab"></span> ${price.USD} USD
              </Link>
               
            </li>
          ) : 
          null
          }
        </div>
      );
  };
  
  export default CoinInfo;