import Web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";

//Goerli Testnet
const connector = new InjectedConnector({ supportedChainIds: [5] });

const getLibrary = (provider) => {
  return new Web3(provider);
};

export { connector, getLibrary };
