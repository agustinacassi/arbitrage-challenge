import Navbar from "./components/Navbar";
import TabTokens from "./commons/Tabs.jsx";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <TabTokens />
    </ChakraProvider>
  );
}

export default App;
