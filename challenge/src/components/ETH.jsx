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
  TableContainer
} from "@chakra-ui/react";
import AlertModal from "../commons/Modal";
const schedule = require("node-schedule");

const PriceTable = () => {
  //Token Prices in Uniswap (u) and Sushiswap (s)
  const [uETH, setUETH] = useState(0);
  const [sETH, setSETH] = useState(0);

  //Arbitrage Opportunity
  const [ETH, setETH] = useState("");

  //Updating Prices every 30 secs
//   schedule.scheduleJob("*/30 * * * * *", function () {
//     getPrices();
//     checkOpportunity();
//   });

  //First Render
  useEffect(() => {
    getPrices();
    checkOpportunity();
  }, []);

  //Obtaining Prices
  const getPrices = async () => {

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

  };

  //Checking Arbitrage Opportunity
  const checkOpportunity = async () => {
    if (uETH < sETH) {
      setETH("uniswap");
    } else if (uETH > sETH) {
      setETH("sushiswap");
    } else {
      setETH("No Opportunity");
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
            <Tr>
              <Td>UNISWAPc</Td>
              <Td isNumeric>25.4</Td>
              <Td>SUSHISWAP</Td>
              <Td isNumeric>25.4</Td>
              <Td>
                <AlertModal />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PriceTable;