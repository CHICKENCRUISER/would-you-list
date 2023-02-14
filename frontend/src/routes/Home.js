import React from "react";
import MainTabs from "../components/MainTabs";
import { Box, Button, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <MainTabs />
    </div>
  );
};

export default Home;
