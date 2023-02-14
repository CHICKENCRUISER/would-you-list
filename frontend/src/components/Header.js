import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";


const Header = () => {
  const navigate = useNavigate();

  return (
    <Box
      bg="burlywood"
      w="100%"
      p={4}
      mb={4}
      color="white"
      height="70px"
    >
      <Button
        colorScheme="white"
        variant="ghost"
        fontSize="2xl"
        onClick={() => { navigate("/"); }}
      >WouldYou List</Button>
      {/* <Box align="right"> */}
      <Button
        colorScheme="white"
        variant="ghost"
        align="end"
        onClick={() => { navigate("/todo"); }}
      >Todo</Button>
      {/* <Divider orientation="vertical" /> */}
      <Button
        colorScheme="white"
        variant="ghost"
        align="end"
        onClick={() => { navigate("/review"); }}
      >Review</Button>
      {/* </Box> */}
    </Box>
  )
}

export default Header;