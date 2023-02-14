import React from "react";
import AppRouter from "./components/Router";
import { useNavigate } from "react-router-dom";
import { ChakraProvider, Box, Button } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <AppRouter />
    </ChakraProvider>
  );
}

export default App;
