import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
} from "@chakra-ui/react";
import Todo from "../routes/Todo";
const MainTabs = () => {
  return (
    <Tabs defaultIndex={1}>
      <TabList>
        <Tab>진행중인 리스트</Tab>
        <Tab>완료한 리스트</Tab>
        <Tab>리뷰</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Todo />
        </TabPanel>
        <TabPanel>
          <Todo />
        </TabPanel>
        <TabPanel>
          <div> 리뷰 </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MainTabs;
