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
  Text
} from "@chakra-ui/react";
import AlertModal from "../commons/Modal";
const schedule = require("node-schedule");

const PriceTable = () => {
  //Token Prices in Uniswap (u) and Sushiswap (s)
  const [uAVE, setUAVE] = useState(0);
  const [sAVE, setSAVE] = useState(0);

  //Arbitrage Opportunity
  const [AVE, setAVE] = useState("No Opportunity");

  //Updating Prices every 30 secs
  schedule.scheduleJob("*/30 * * * * *", function () {
    getPrices();
    checkOpportunity();
  });

  //First Render
  useEffect(() => {
    checkOpportunity();
  }, [uAVE]);

  //Obtaining Prices
  const getPrices = async () => {
    //3. USDC/AAVE
    const u_USDC_AAVE = await axios.get(process.env.REACT_APP_u_USDC_AAVE);
    setUAVE(Number(u_USDC_AAVE.data.toTokenAmount));
    const s_USDC_AAVE = await axios.get(process.env.REACT_APP_s_USDC_AAVE);
    setSAVE(Number(s_USDC_AAVE.data.toTokenAmount));
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
            {AVE === "uniswap" ? (
              <Tr>
                <Td>UNISWAP</Td>
                <Td isNumeric>{uAVE / 1000000} USDC</Td>
                <Td>SUSHISWAP</Td>
                <Td isNumeric>{sAVE / 1000000} USDC</Td>
                <Td>
                  <AlertModal />
                </Td>
              </Tr>
            ) : AVE === "sushiswap" ? (
              <Tr>
                <Td>SUSHISWAP</Td>
                <Td isNumeric>{sAVE / 1000000} USDC</Td>
                <Td>UNISWAP</Td>
                <Td isNumeric>{uAVE / 1000000} USDC</Td>
                <Td>
                  <AlertModal dexA={uAVE} dexB={sAVE} />
                </Td>
              </Tr>
            ) : (
              <Tr>
                <Td>SUSHISWAP</Td>
                <Td isNumeric>{sAVE / 1000000} USDC</Td>
                <Td>UNISWAP</Td>
                <Td isNumeric>{uAVE / 1000000} USDC</Td>
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
