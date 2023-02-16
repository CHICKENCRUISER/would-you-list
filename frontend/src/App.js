import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import AppRouter from "./components/Router";


const App = () => {
  return (
    <ChakraProvider>
      <AppRouter />
    </ChakraProvider>
  );
}

export default App;
