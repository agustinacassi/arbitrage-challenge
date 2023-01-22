import Navbar from "./components/Navbar";
import TabTokens from "./commons/Tabs.jsx";
import { Box } from "@chakra-ui/react";
import Header from "./commons/Heading.jsx";
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <Box w="100%" p={4}>
        <TabTokens />
      </Box>
      <Footer/>
    </>
  );
}

export default App;
