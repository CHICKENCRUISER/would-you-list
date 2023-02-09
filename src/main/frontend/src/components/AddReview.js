import React, { useState } from "react";
import { createTodo } from "../models/todos";
import {
  FormControl,
  Input,
  Select,
  Box,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";

const AddReview = () => {
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [place, setPlace] = useState("");
  const [expression, setExpression] = useState("happy");
  let navigate = useNavigate();

  const reviewFormSubmitted = async (e) => {
    e.preventDefault();
    const newReview = {
      user: "이동섭",
      date: Date.now(),
      title,
      content,
      expression,
      place,
      todoId: id,
    };
    console.log(newReview);
    // try {
    //   await createTodo(newReview);
    // } catch (e) {
    //   console.error(e);
    // }
    navigate("/");
  };

  return (
    <Box m={4}>
      <form onSubmit={reviewFormSubmitted}>
        <FormControl>
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
            placeholder="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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

          <Input type="submit" value="Done!" />
        </FormControl>
      </form>
    </Box>
  );
};

export default AddReview;
