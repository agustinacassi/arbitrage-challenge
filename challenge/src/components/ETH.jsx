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
  const [uETH, setUETH] = useState(0);
  const [sETH, setSETH] = useState(0);

  //Arbitrage Opportunity
  const [ETH, setETH] = useState("No Opportunity");

  // Updating Prices every 30 secs
    schedule.scheduleJob("*/30 * * * * *", function () {
      getPrices();
      checkOpportunity();
    });

  //First Render
  useEffect(() => {
    checkOpportunity();
  }, [uETH]);

  //Obtaining Prices
  const getPrices = async () => {
    //2. USDC/ETH
    const u_USDC_ETH = await axios.get(process.env.REACT_APP_u_USDC_ETH);
    setUETH(Number(u_USDC_ETH.data.toTokenAmount));
    const s_USDC_ETH = await axios.get(process.env.REACT_APP_s_USDC_ETH);
    setSETH(Number(s_USDC_ETH.data.toTokenAmount));
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
            {ETH === "uniswap" ? (
              <Tr>
                <Td>UNISWAP</Td>
                <Td isNumeric>{uETH / 1000000} USDC</Td>
                <Td>SUSHISWAP</Td>
                <Td isNumeric>{sETH / 1000000} USDC</Td>
                <Td>
                  <AlertModal />
                </Td>
              </Tr>
            ) : ETH === "sushiswap" ? (
              <Tr>
                <Td>SUSHISWAP</Td>
                <Td isNumeric>{sETH / 1000000} USDC</Td>
                <Td>UNISWAP</Td>
                <Td isNumeric>{uETH / 1000000} USDC</Td>
                <Td>
                  <AlertModal dexA={uETH} dexB={sETH} />
                </Td>
              </Tr>
            ) : (
              <Tr>
                <Td>SUSHISWAP</Td>
                <Td isNumeric>{sETH / 1000000} USDC</Td>
                <Td>UNISWAP</Td>
                <Td isNumeric>{uETH / 1000000} USDC</Td>
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
