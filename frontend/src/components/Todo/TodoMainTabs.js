import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
} from "@chakra-ui/react";

import Todo from "./Todo";
import ReviewedTodo from "./ReviewedTodo";


// Todo 기본 화면 -> 미완료 목록 / 완료 목록 display
const TodoMainTabs = () => {
  return (
    <Tabs defaultIndex={0} align="center" variant='soft-rounded' colorScheme='yellow'>
      <TabList>
        <Tab>진행중인 리스트</Tab>
        <Tab>완료한 리스트</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          {/* 진행중인 리스트 */}
          <Todo isDone={false} />
        </TabPanel>
        <TabPanel>
          <Stack spacing={50}>
            {/* 리뷰 작성 안된 완료 투두 */}
            <Todo isDone={true} />
            {/* 리뷰 작성된 완료 투두 */}
            <ReviewedTodo />
          </Stack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TodoMainTabs;
