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
    }
  })

}