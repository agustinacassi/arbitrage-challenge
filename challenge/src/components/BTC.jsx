import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
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
} from "@chakra-ui/react";
import AlertModal from "../commons/Modal";
const schedule = require("node-schedule");

const PriceTable = () => {
  //Token Prices in Uniswap (u) and Sushiswap (s)
  const [uBTC, setUBTC] = useState(0);
  const [sBTC, setSBTC] = useState(0);

  //Arbitrage Opportunity
  const [BTC, setBTC] = useState("No Opportunity");

  //   Updating Prices every 30 secs
  schedule.scheduleJob("*/10 * * * * *", function () {
    getPrices();
    checkOpportunity();
  });

  //First Render
  useEffect(() => {
    checkOpportunity();
  }, [uBTC]);

  //Obtaining Prices
  const getPrices = async () => {
    //1. USDC/wBTC
    const u_USDC_WBTC = await axios.get(process.env.REACT_APP_u_USDC_WBTC);
    setUBTC(Number(u_USDC_WBTC.data.toTokenAmount));

    const s_USDC_WBTC = await axios.get(process.env.REACT_APP_s_USDC_WBTC);
    setSBTC(Number(s_USDC_WBTC.data.toTokenAmount));
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
  };

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
            {BTC === "uniswap" ? (
              <Tr>
                <Td>UNISWAP</Td>
                <Td isNumeric>{uBTC / 1000000} USDC</Td>
                <Td>SUSHISWAP</Td>
                <Td isNumeric>{sBTC / 1000000} USDC</Td>
                <Td>
                  <AlertModal />
                </Td>
              </Tr>
            ) : BTC === "sushiswap" ? (
              <Tr>
                <Td>SUSHISWAP</Td>
                <Td isNumeric>{sBTC / 1000000} USDC</Td>
                <Td>UNISWAP</Td>
                <Td isNumeric>{uBTC / 1000000} USDC</Td>
                <Td>
                  <AlertModal dexA={uBTC} dexB={sBTC} />
                </Td>
              </Tr>
            ) : (
              <Tr>
                <Td>SUSHISWAP</Td>
                <Td isNumeric>{sBTC / 1000000} USDC</Td>
                <Td>UNISWAP</Td>
                <Td isNumeric>{uBTC / 1000000} USDC</Td>
                <Td>
                  <Text>Checking prices. Please wait...</Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PriceTable;
