import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";


// 웹의 모든 페이지에 고정되어 있는 헤더 메뉴 바
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
      {/* Home 버튼 */}
      <Button
        colorScheme="white"
        variant="ghost"
        fontSize="2xl"
        onClick={() => { navigate("/"); }}
      >WouldYou List</Button>

      {/* Todo 버튼 */}
      <Button
        colorScheme="white"
        variant="ghost"
        align="end"
        onClick={() => { navigate("/todo"); }}
      >Todo</Button>
      
      {/* Review 버튼 */}
      <Button
        colorScheme="white"
        variant="ghost"
        align="end"
        onClick={() => { navigate("/review"); }}
      >Review</Button>
    </Box>
  )
}

export default Header;