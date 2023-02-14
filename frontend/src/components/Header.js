import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";


const Header = () => {
  const navigate = useNavigate();

  return (
    <Box
      bg="pink"
      w="100%"
      p={4}
      mb={4}
      color="white"
      fontSize="2xl"
      height="70px"
    >
      WouldYou List
      {/* <Box align="right"> */}
      <Button colorScheme="white" variant="ghost" align="end" onClick={() => { navigate("/"); }}>Todo</Button>
      {/* <Divider orientation="vertical" /> */}
      <Button colorScheme="white" variant="ghost" align="end" onClick={() => { navigate("/review"); }}>Review</Button>
      {/* </Box> */}
    </Box>
  )
}

export default Header;