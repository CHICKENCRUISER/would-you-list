import React, { useState } from "react";
import { updateReview } from "../models/reviews";
import {
  FormControl,
  Input,
  Box,
  RadioGroup,
  Radio,
  Stack,
  Card,
  CardBody,
  Text,
  CardHeader,
  Heading,
  StackDivider,
  Checkbox,
  Textarea,
  Badge,
  Image,
  Button
} from "@chakra-ui/react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SquareCrop from "../components/Review/ReviewImgForm";

const EditReview = () => {
  const defaultImg = "https://wouldyoulistfile.s3.ap-northeast-2.amazonaws.com/images/51bcb6cd-16b8-4ceb-9622-5fde24e51ac9defaultPhoto.jpeg";
  const location = useLocation();
  const { state: { data } } = location;
  console.log(data);

  let { id } = useParams();
  const [title, setTitle] = useState(data.title);
  const [review, setReview] = useState(data.review);
  const [place, setPlace] = useState(data.place);
  const [expression, setExpression] = useState(data.expression);
  const [file, setFile] = useState(data.photo !== defaultImg ? data.photo : null);
  const [imgSelect, setImgSelect] = useState(data.photo!==defaultImg ? true : false);
  const [isChanged, setIsChanged] = useState(false);

  const tagColors = {
    FOOD: "gray",
    MOVIE: "red",
    DRAMA: "orange",
    ACTIVITY: "yellow",
    BOOK: "green",
    MUSIC: "teal",
    BAKING: "blue",
    SPORTS: "cyan",
  };

  let todosDone = useSelector((state) => state.todosDone);
  const todo = todosDone.find((todo) => todo.id === Number(id));

  let navigate = useNavigate();

  const imgCheckChanged = () => { setImgSelect(prev => !prev); }
  const reviewFormSubmitted = async (e) => {
    e.preventDefault();
    const newReview = new FormData();
    newReview.append("title", title);
    newReview.append("review", review);
    newReview.append("place", place);
    newReview.append("doneDate", Date.now());
    newReview.append("expression", expression);
    newReview.append("todoId", todo.id);
    newReview.append("file", file);
    
    await updateReview(newReview);
    navigate("/review");
  };

  return (
    <Box m={4}>
      <Card>
        <CardHeader>
          <Heading size="md" textAlign={"center"}>
            "{data.todo.name}"에 대한 멋진 리뷰를 남겨 주세요!
          </Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                TODO
              </Heading>
              <Text pt="2" fontSize="sm">
                {data.todo.name}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                CATEGORY
              </Heading>
              <Badge
                colorScheme={tagColors[data.todo.category]}
                textAlign="middle"
              >
                {data.todo.category}
              </Badge>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                REVIEW
              </Heading>
              <form onSubmit={reviewFormSubmitted}>
                <FormControl mt={4}>
                  <Input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    mb={4}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="place"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    mb={4}
                    required
                  />
                  <Textarea
                    type="text"
                    placeholder="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    mb={4}
                    required
                  />
                  <Card><CardBody><Box>
                    <Checkbox defaultChecked={!imgSelect} onChange={imgCheckChanged} mb={2}>기본 이미지 사용</Checkbox>
                    {(imgSelect && !isChanged) ? (
                      <>
                        <Image src={file ? file : defaultImg} alt="current image" width="150px" height="150px" mt={2} mb={2} />
                        <Button colorScheme="blue" onClick={() => { setIsChanged(true); }}>Change</Button>
                      </>
                    ) : null}
                    {(imgSelect && isChanged) ? <SquareCrop setFile={setFile} /> : null}
                  </Box></CardBody></Card>
                  <RadioGroup
                    defaultValue="2"
                    m={4}
                    onChange={setExpression}
                    value={expression}
                  >
                    <Stack spacing={5} direction="row">
                      <Radio colorScheme="green" value="happy">
                        😃
                      </Radio>
                      <Radio colorScheme="red" value="sad">
                        😭
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <Stack spacing={2}>
                    <Input type="submit" value="Done!" />
                    <Input type="button" value="Cancle" onClick={() => navigate("/todo")} />
                  </Stack>
                </FormControl>
              </form>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default EditReview;
