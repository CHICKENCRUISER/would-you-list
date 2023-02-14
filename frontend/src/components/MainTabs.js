import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Center
} from "@chakra-ui/react";
import Todo from "./Todo/Todo";
import ReviewedTodo from "./Todo/ReviewedTodo";
import ReviewGrid from "./Review/ReviewGrid";

//메인 탭
//Home => MainTabs
const MainTabs = () => {
  return (
    <Tabs defaultIndex={0} align="center" variant='soft-rounded' colorScheme='green'>
      <TabList>
        <Tab>진행중인 리스트</Tab>
        <Tab>완료한 리스트</Tab>
        <Tab>리뷰</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          {/* 진행중인 리스트 */}
          <Todo isDone={false} />
        </TabPanel>
        <TabPanel>
          <Stack spacing={50}>
            {/* 완료한 리스트 */}
            <Todo isDone={true} />
            <ReviewedTodo />
          </Stack>
        </TabPanel>
        <TabPanel>
          {/* 리뷰 */}
          {/* <Review /> */}
          <ReviewGrid />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MainTabs;
