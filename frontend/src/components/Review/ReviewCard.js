import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteReview } from "../../models/reviews";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  IconButton,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  ChevronDownIcon,
  HamburgerIcon,
  EditIcon,
  SmallCloseIcon
} from "@chakra-ui/icons";

//리뷰 카드 컴포넌트
const ReviewCard = ({ data }) => {

  const navigate = useNavigate();
  const deleteBtnClicked = async () => {
    try {
      await deleteReview(data.todo.review.id);
      navigate("/review");
    } catch (e) { console.error(e); }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card mb={4} style={{ maxWidth: "600px" }}>
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

              <Box>
                <Heading size="sm">{data.title}</Heading>
                <Text>{data.doneDate + " " + data.place + "에서"}</Text>
              </Box>
            </Flex>
            {/* 이걸 나중에 수정버튼으로 쓰자구 */}
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='ghost'
                colorScheme="gray"
              />
              <MenuList>
                <MenuItem icon={<EditIcon />}>수정</MenuItem>
                <MenuItem icon={<SmallCloseIcon />} onClick={deleteBtnClicked}>삭제</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{data.review}</Text>
        </CardBody>
        <Image objectFit="cover" src={data.photo} alt="Chakra UI" />

        {/* 아래 코드는 카드 하단 인데 사실 쓸모는 없지만 혹시 몰라서 남겨둠 */}
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button flex="1" variant="ghost" leftIcon={<AddIcon />}>
            Like
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<AddIcon />}>
            Comment
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<AddIcon />}>
            Share
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReviewCard;
