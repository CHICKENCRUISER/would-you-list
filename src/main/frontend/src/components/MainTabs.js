import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Todo from "./Todo";

//메인 탭
//Home => MainTabs
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
          {/* 진행중인 리스트 */}
          <Todo isDone={false} />
        </TabPanel>
        <TabPanel>
          {/* 완료한 리스트 */}
          <Todo isDone={true} />
        </TabPanel>
        <TabPanel>
          {/* 리뷰 */}
          <div> 리뷰 </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MainTabs;
