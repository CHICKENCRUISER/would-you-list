import React from "react";
import AppRouter from "./components/Router";
import { ChakraProvider, Box } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Box
        bg="pink"
        w="100%"
        p={4}
        mb={4}
        color="white"
        fontSize="2xl"
        height={"70px"}
      >
        WouldYou List
      </Box>
      <AppRouter />
    </ChakraProvider>
  );
}

export default App;
