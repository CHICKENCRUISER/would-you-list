import React, { useState, useEffect } from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from "@chakra-ui/react";
import { getTodosByState } from "../../models/todos";


const ReviewedTodo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const f = async () => {
      const res = await getTodosByState("reviewed");
      setTodos(res);
    }
    f();
  }, []);

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>리뷰 작성이 완료되었어요</AccordionButton>
        <AccordionPanel>
          {todos ? (
            todos.map((todo) => (<h2 key={todo.id}>{todo.name}</h2>))
          ) : (
            <h2>리뷰를 작성해보세요!</h2>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default ReviewedTodo;