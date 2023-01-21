import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const schedule = require("node-schedule");

const Table = () => {
  //Token Prices in Uniswap (u) and Sushiswap (s)
  const [uBTC, setUBTC] = useState(0);
  const [sBTC, setSBTC] = useState(0);
  const [uETH, setUETH] = useState(0);
  const [sETH, setSETH] = useState(0);
  const [uAVE, setUAVE] = useState(0);
  const [sAVE, setSAVE] = useState(0);

  //Arbitrage Opportunity
  const [BTC, setBTC] = useState("");
  const [ETH, setETH] = useState("");
  const [AVE, setAVE] = useState("");

  //Updating Prices every 30 secs
  schedule.scheduleJob("*/30 * * * * *", function () {
    getPrices();
    checkOpportunity();
  });

  //First Render
  useEffect(() => {
    getPrices();
    checkOpportunity();
  }, []);

  //Obtaining Prices
  const getPrices = async () => {
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

  //Checking Arbitrage Opportunity
  const checkOpportunity = async () => {
    if (uBTC < sBTC) {
      setBTC("uniswap");
    } else if (uBTC > sBTC) {
      setBTC("sushiswap");
    } else {
      setBTC("No Opportunity");
    }
    if (uETH < sETH) {
      setETH("uniswap");
    } else if (uETH > sETH) {
      setETH("sushiswap");
    } else {
      setETH("No Opportunity");
    }
    if (uAVE < sAVE) {
      setAVE("uniswap");
    } else if (uAVE > sAVE) {
      setAVE("sushiswap");
    } else {
      setAVE("No Opportunity");
    }
  };

  const mainFunction = async () => {
    const first = await getPrices();
    const second = await checkOpportunity();
  };

  return <button onClick={mainFunction}>ARBITRAGE</button>;
};

export default Table;
