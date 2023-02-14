import React from "react";
import MainTabs from "../components/MainTabs";
import { Box, Button, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const TodoMain = () => {
  return (
    <div>
      <MainTabs />
    </div>
  );
};

export default TodoMain;
