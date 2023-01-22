import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import BTC from "../components/BTC";
import AAVE from "../components/AAVE";
import ETH from "../components/ETH";
import { Text, Box } from "@chakra-ui/react";

import React from "react";

const TabTokens = () => {
  return (
    <div>
      <Box>
        <Text fontSize="xl">Tablas comparativas.</Text>
      </Box>
      <Box>
        <Text fontSize="xl">Precios ofrecidos en los exchanges Uniswap y Sushiswap.</Text>
      </Box>
      <br></br>
      <Tabs isFitted variant="enclosed" colorScheme={"orange"}>
        <TabList mb="1em">
          <Tab>
            <b>wBTC</b>
          </Tab>
          <Tab>
            <b>ETH</b>
          </Tab>
          <Tab>
            <b>AAVE</b>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BTC />
          </TabPanel>
          <TabPanel>
            <ETH />
          </TabPanel>
          <TabPanel>
            <AAVE />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default TabTokens;
