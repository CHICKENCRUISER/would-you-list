import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  EditIcon,
  DeleteIcon
} from "@chakra-ui/icons";

import { deleteReview } from "../../models/reviews";


// ReviewCard의 CardHeader 부분 컴포넌트
// prop의 data는 review 객체
const ReviewCardHeader = ({ data }) => {

  const navigate = useNavigate();

  const editBtnClicked = () => {
    navigate(`/review/edit/${data.id}`, { state: { data } });
  }
  const deleteBtnClicked = async () => {
    try {
      await deleteReview(data.id);
      navigate("/review");
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <Flex spacing="4">

      {/* 프로필 사진 + date/place */}
      <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
        <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
        <Box>
          <Heading size="sm">{data.reviewTitle}</Heading>
          <Text>{data.doneDate + " " + data.place + "에서"}</Text>
        </Box>
      </Flex>

      {/* Menu: 수정/삭제 */}
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="ghost"
          colorScheme="gray"
        />
        <MenuList>

          <MenuItem
            icon={<EditIcon />}
            onClick={editBtnClicked}
          >리뷰 수정</MenuItem>

          <MenuItem
            icon={<DeleteIcon />}
            onClick={deleteBtnClicked}
          >리뷰 삭제</MenuItem>

        </MenuList>
      </Menu>

    </Flex>
  )
}


export default ReviewCardHeader;