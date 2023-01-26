import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Spinner,
} from "@chakra-ui/react";
import AlertModal from "../commons/Modal";
import { TabContext } from "../contexts/TabContext";
const schedule = require("node-schedule");

const PricesTable = () => {
  //Calling Tab Context
  const { selectedTab } = useContext(TabContext);

  //Token Prices in Uniswap (u) and Sushiswap (s)
  const [prices, setPrices] = useState({
    uETH: 0,
    sETH: 0,
    uAAVE: 0,
    sAAVE: 0,
    uBTC: 0,
    sBTC: 0,
  });

  //Arbitrage Opportunity for each asset
  const [opportunity, setOpportunity] = useState({
    ETH: undefined,
    AAVE: undefined,
    WBTC: undefined,
  });

  //Variable created to detect changes in price and opportunity values to re-render table
  const [changing, setChanging] = useState(false);

  // Updating Prices every 30 secs
  schedule.scheduleJob("*/30 * * * * *", async () => {
    setChanging(true);
    const price = await getPrices();
    const opp = checkOpportunity();
    setChanging(false);
  });

  //Obtaining Prices and setting values in opportunity state
  const getPrices = async () => {
    //1. USDC/ETH
    try {
      opportunity.ETH = undefined;
      const u_USDC_ETH = await axios.get(process.env.REACT_APP_u_USDC_ETH);
      prices.uETH = Number(u_USDC_ETH.data.toTokenAmount);
    } catch (error) {
      opportunity.ETH =
        "No se pudo completar la consulta. Intenta otra vez en unos minutos.";
    }

    try {
      const s_USDC_ETH = await axios.get(process.env.REACT_APP_s_USDC_ETH);
      prices.sETH = Number(s_USDC_ETH.data.toTokenAmount);
    } catch (error) {
      opportunity.ETH =
        "No se pudo completar la consulta. Intenta otra vez en unos minutos.";
    }

    //2. USDC/AAVE
    try {
      opportunity.AAVE = undefined;
      const u_USDC_AAVE = await axios.get(process.env.REACT_APP_u_USDC_AAVE);
      prices.uAAVE = Number(u_USDC_AAVE.data.toTokenAmount);
    } catch (error) {
      opportunity.AAVE =
        "No se pudo completar la consulta. Intenta otra vez en unos minutos.";
    }

    try {
      const s_USDC_AAVE = await axios.get(process.env.REACT_APP_s_USDC_AAVE);
      prices.sAAVE = Number(s_USDC_AAVE.data.toTokenAmount);
    } catch (error) {
      opportunity.AAVE =
        "No se pudo completar la consulta. Intenta otra vez en unos minutos.";
    }

    //3. USDC/wBTC
    try {
      opportunity.WBTC = undefined;
      const u_USDC_WBTC = await axios.get(process.env.REACT_APP_u_USDC_WBTC);
      prices.uBTC = Number(u_USDC_WBTC.data.toTokenAmount);
    } catch (error) {
      opportunity.WBTC =
        "No se pudo completar la consulta. Intenta otra vez en unos minutos.";
    }

    try {
      const s_USDC_WBTC = await axios.get(process.env.REACT_APP_s_USDC_WBTC);
      prices.sBTC = Number(s_USDC_WBTC.data.toTokenAmount);
    } catch (error) {
      opportunity.WBTC =
        "No se pudo completar la consulta. Intenta otra vez en unos minutos.";
    }
  };

  //Checking Arbitrage Opportunity
  function checkOpportunity() {
    let assets = [
      { ETH: prices.uETH },
      { ETH: prices.sETH },
      { AAVE: prices.uAAVE },
      { AAVE: prices.sAAVE },
      { WBTC: prices.uBTC },
      { WBTC: prices.sBTC },
    ];
    let dexes = ["uniswap", "sushiswap"];

    for (let i = 0; i < assets.length; i += 2) {
      let assetName = Object.keys(assets[i]);
      if (assets[i] < assets[i + 1]) {
        opportunity[assetName] = dexes[0];
      } else {
        opportunity[assetName] = dexes[1];
      }
    }
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableCaption>Precio actualizado cada 30 segundos</TableCaption>
          <Thead>
            <Tr>
              <Th>Comprás en</Th>
              <Th isNumeric>PRECIO</Th>
              <Th>Vendés en</Th>
              <Th isNumeric>PRECIO</Th>
              <Th>Oportunidad de Arbitraje</Th>
            </Tr>
          </Thead>
          <Tbody>
            {changing === false ? (
              selectedTab === "ETH" && opportunity.ETH === "uniswap" ? (
                <Tr>
                  <Td>UNISWAP</Td>
                  <Td isNumeric>{prices.uETH / 1000000} USDC</Td>
                  <Td>SUSHISWAP</Td>
                  <Td isNumeric>{prices.sETH / 1000000} USDC</Td>
                  <Td>
                    <AlertModal dexA={prices.uETH} dexB={prices.sETH} />
                  </Td>
                </Tr>
              ) : selectedTab === "ETH" && opportunity.ETH === "sushiswap" ? (
                <Tr>
                  <Td>SUSHISWAP</Td>
                  <Td isNumeric>{prices.sETH / 1000000} USDC</Td>
                  <Td>UNISWAP</Td>
                  <Td isNumeric>{prices.uETH / 1000000} USDC</Td>
                  <Td>
                    <AlertModal dexA={prices.sETH} dexB={prices.uETH} />
                  </Td>
                </Tr>
              ) : selectedTab === "ETH" &&
                opportunity.ETH ===
                  "No se pudo completar la consulta. Intenta otra vez en unos minutos." ? (
                <Tr>
                  <Td>SUSHISWAP</Td>
                  <Td isNumeric>{prices.sBTC} USDC</Td>
                  <Td>UNISWAP</Td>
                  <Td isNumeric>{prices.uBTC} USDC</Td>
                  <Td>
                    <Text>{opportunity.ETH}</Text>
                  </Td>
                </Tr>
              ) : selectedTab === "ETH" && opportunity.ETH === "undefined" ? (
                <Tr>
                  <Td>SUSHISWAP</Td>
                  <Td isNumeric>{prices.sETH} USDC</Td>
                  <Td>UNISWAP</Td>
                  <Td isNumeric>{prices.uETH} USDC</Td>
                  <Td>
                    <Text>
                      <Spinner /> Obteniendo precios. Por favor espere...
                    </Text>
                  </Td>
                </Tr>
              ) : selectedTab === "AAVE" && opportunity.AAVE === "uniswap" ? (
                <Tr>
                  <Td>UNISWAP</Td>
                  <Td isNumeric>{prices.uAAVE / 1000000} USDC</Td>
                  <Td>SUSHISWAP</Td>
                  <Td isNumeric>{prices.sAAVE / 1000000} USDC</Td>
                  <Td>
                    <AlertModal dexA={prices.uAAVE} dexB={prices.sAAVE} />
                  </Td>
                </Tr>
              ) : selectedTab === "AAVE" && opportunity.AAVE === "sushiswap" ? (
                <Tr>
                  <Td>SUSHISWAP</Td>
                  <Td isNumeric>{prices.sAAVE / 1000000} USDC</Td>
                  <Td>UNISWAP</Td>
                  <Td isNumeric>{prices.uAAVE / 1000000} USDC</Td>
                  <Td>
                    <AlertModal dexA={prices.sAAVE} dexB={prices.uAAVE} />
                  </Td>
                </Tr>
              ) : selectedTab === "AAVE" &&
                opportunity.AAVE ===
                  "No se pudo completar la consulta. Intenta otra vez en unos minutos." ? (
                <Tr>
                  <Td>SUSHISWAP</Td>
                  <Td isNumeric>{prices.uAAVE} USDC</Td>
                  <Td>UNISWAP</Td>
                  <Td isNumeric>{prices.sAAVE} USDC</Td>
                  <Td>
                    <Text>{opportunity.AAVE}</Text>
                  </Td>
                </Tr>
              ) : selectedTab === "AAVE" && opportunity.AAVE === "undefined" ? (
                <Tr>
                  <Td>SUSHISWAP</Td>
                  <Td isNumeric>{prices.sAAVE} USDC</Td>
                  <Td>UNISWAP</Td>
                  <Td isNumeric>{prices.uAAVE} USDC</Td>
                  <Td>
                    <Text>
                      <Spinner /> Obteniendo precios. Por favor espere...
                    </Text>
                  </Td>
                </Tr>
              ) : selectedTab === "BTC" && opportunity.WBTC === "uniswap" ? (
                <Tr>
                  <Td>UNISWAP</Td>
                  <Td isNumeric>{prices.uBTC / 1000000} USDC</Td>
                  <Td>SUSHISWAP</Td>
                  <Td isNumeric>{prices.sBTC / 1000000} USDC</Td>
                  <Td>
                    <AlertModal />
                  </Td>
                </Tr>
              ) : selectedTab === "BTC" && opportunity.WBTC === "sushiswap" ? (
                <Tr>
                  <Td>SUSHISWAP</Td>
                  <Td isNumeric>{prices.sBTC / 1000000} USDC</Td>
                  <Td>UNISWAP</Td>
                  <Td isNumeric>{prices.uBTC / 1000000} USDC</Td>
                  <Td>
                    <AlertModal dexA={prices.sBTC} dexB={prices.uBTC} />
                  </Td>
                </Tr>
              ) : selectedTab === "BTC" &&
                opportunity.WBTC ===
                  "No se pudo completar la consulta. Intenta otra vez en unos minutos." ? (
                <Tr>
                  <Td>SUSHISWAP</Td>
                  <Td isNumeric>{prices.sBTC} USDC</Td>
                  <Td>UNISWAP</Td>
                  <Td isNumeric>{prices.uBTC} USDC</Td>
                  <Td>
                    <Text>{opportunity.WBTC}</Text>
                  </Td>
                </Tr>
              ) : selectedTab === "BTC" && opportunity.WBTC === "undefined" ? (
                <Tr>
                  <Td>SUSHISWAP</Td>
                  <Td isNumeric>{prices.sBTC} USDC</Td>
                  <Td>UNISWAP</Td>
                  <Td isNumeric>{prices.uBTC} USDC</Td>
                  <Td>
                    <Text>
                      <Spinner /> Obteniendo precios. Por favor espere...
                    </Text>
                  </Td>
                </Tr>
              ) : (
                <Tr>
                  <Td>SUSHISWAP</Td>
                  <Td isNumeric>{prices.sBTC} USDC</Td>
                  <Td>UNISWAP</Td>
                  <Td isNumeric>{prices.uBTC} USDC</Td>
                  <Td>
                    <Text>
                      <Spinner /> Obteniendo precios. Por favor espere...
                    </Text>
                  </Td>
                </Tr>
              )
            ) : (
              <Tr>
                <Td>SUSHISWAP</Td>
                <Td isNumeric>{prices.sBTC} USDC</Td>
                <Td>UNISWAP</Td>
                <Td isNumeric>{prices.uBTC} USDC</Td>
                <Td>
                  <Text>
                    <Spinner /> Obteniendo precios. Por favor espere...
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PricesTable;
