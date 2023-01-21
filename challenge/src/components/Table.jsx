import React, { useState } from "react";
import axios from "axios";
const schedule = require("node-schedule");

const Table = () => {
  const [uBTC, setUBTC] = useState(0);
  const [sBTC, setSBTC] = useState(0);
  const [uETH, setUETH] = useState(0);
  const [sETH, setSETH] = useState(0);
  const [uAVE, setUAVE] = useState(0);
  const [sAVE, setSAVE] = useState(0);

  schedule.scheduleJob("*/30 * * * * *", function () {
    return getPrices()
  });

  const getPrices = async () => {
    //Obtains prices from Uniswap and Sushiswap using 1Inch API

    //1. USDC/wBTC
    const u_USDC_WBTC = await axios
      .get(
        "https://api.1inch.io/v5.0/1/quote?fromTokenAddress=0x2260fac5e5542a773aa44fbcfedf7c193bc2c599&toTokenAddress=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&amount=100000000&protocols=UNISWAP_V3"
      )
      .then((response) => setUBTC(response.data.toTokenAmount));

    const s_USDC_WBTC = await axios
      .get(
        "https://api.1inch.io/v5.0/1/quote?fromTokenAddress=0x2260fac5e5542a773aa44fbcfedf7c193bc2c599&toTokenAddress=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&amount=100000000&protocols=SUSHI"
      )
      .then((response) => setSBTC(response.data.toTokenAmount));

    //2. USDC/ETH
    const u_USDC_ETH = await axios
      .get(
        "https://api.1inch.io/v5.0/1/quote?fromTokenAddress=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&toTokenAddress=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&amount=1000000000000000000&protocols=UNISWAP_V3"
      )
      .then((response) => setUETH(response.data.toTokenAmount));
    const s_USDC_ETH = await axios
      .get(
        "https://api.1inch.io/v5.0/1/quote?fromTokenAddress=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&toTokenAddress=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&amount=1000000000000000000&protocols=SUSHI"
      )
      .then((response) => setSETH(response.data.toTokenAmount));

    //3. USDC/wXRP
    const u_USDC_AAVE = await axios
      .get(
        "https://api.1inch.io/v5.0/1/quote?fromTokenAddress=0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9&toTokenAddress=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&amount=1000000000000000000&protocols=UNISWAP_V3"
      )
      .then((response) => setUAVE(response.data.toTokenAmount));
    const s_USDC_AAVE = await axios
      .get(
        "https://api.1inch.io/v5.0/1/quote?fromTokenAddress=0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9&toTokenAddress=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&amount=1000000000000000000&protocols=SUSHI"
      )
      .then((response) => setSAVE(response.data.toTokenAmount));
  };


  return <button onClick={getPrices}></button>;
};

export default Table;
