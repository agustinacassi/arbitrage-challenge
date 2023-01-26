import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import PricesTable from "../components/PricesTable";
import { Text, Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { TabContext } from "../contexts/TabContext";

const TabTokens = () => {
  //Obtaining Tab Context
  const { selection } = useContext(TabContext);

  return (
    <div>
      <Box>
        <Text fontSize="xl">Tablas comparativas.</Text>
      </Box>
      <Box>
        <Text fontSize="xl">
          Precios ofrecidos en los exchanges Uniswap y Sushiswap.
        </Text>
        <Text fontSize="xl" as="em">
          Conecte su wallet y utilice la red Göerli para operar. Otras redes no
          son soportadas.
        </Text>
      </Box>
      <br></br>
      <Tabs isFitted variant="enclosed" colorScheme={"orange"}>
        <TabList mb="1em">
          <Tab value={"BTC"} onClick={(e) => selection(e.target.value)}>
            WBTC
          </Tab>
          <Tab value={"ETH"} onClick={(e) => selection(e.target.value)}>
            ETH
          </Tab>
          <Tab value={"AAVE"} onClick={(e) => selection(e.target.value)}>
            AAVE
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PricesTable />
          </TabPanel>
          <TabPanel>
            <PricesTable />
          </TabPanel>
          <TabPanel>
            <PricesTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default TabTokens;
