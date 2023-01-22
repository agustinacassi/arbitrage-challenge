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
  const [uAVE, setUAVE] = useState(0);
  const [sAVE, setSAVE] = useState(0);

  //Arbitrage Opportunity
  const [AVE, setAVE] = useState("");

  //Updating Prices every 30 secs
  // schedule.scheduleJob("*/30 * * * * *", function () {
  //   getPrices();
  //   checkOpportunity();
  // });

  //First Render
  useEffect(() => {
    getPrices();
    checkOpportunity();
  }, []);

  //Obtaining Prices
  const getPrices = async () => {
    //3. USDC/AAVE
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
    if (uAVE < sAVE) {
      setAVE("uniswap");
    } else if (uAVE > sAVE) {
      setAVE("sushiswap");
    } else {
      setAVE("No Opportunity");
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
              <Td>UNISWAPb</Td>
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