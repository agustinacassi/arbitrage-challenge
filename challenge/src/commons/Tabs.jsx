import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import BTC from "../components/BTC";
import AAVE from "../components/AAVE";
import ETH from "../components/ETH";

import React from "react";

const TabTokens = () => {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>BTC</Tab>
        <Tab>ETH</Tab>
        <Tab>AAVE</Tab>
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
  );
};

export default TabTokens;
