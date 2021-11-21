import React, { useState, SyntheticEvent } from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { a11yProps } from "./utils/ui-helper";
import TabPanel from "./components/ui-elements/TabPanel";
import CreateLabel from "./components/pages/home/tabs/create-label";
import ReadAndAddData from "./components/pages/home/tabs/read-and-add-data";

function App() {
    const [activeTab, setActiveTab] = useState(0);
    const theme = useTheme();
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };
  return (
      <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
          <AppBar position="static">
              <Tabs
                  value={activeTab}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
              >
                  <Tab label="Create Label" {...a11yProps(0)} />
                  <Tab label="Read data / add data" {...a11yProps(1)} />
              </Tabs>
          </AppBar>
          <TabPanel value={activeTab} index={0} dir={theme.direction}>
              <CreateLabel />
          </TabPanel>
          <TabPanel value={activeTab} index={1} dir={theme.direction}>
             <ReadAndAddData />
          </TabPanel>
      </Box>
  );
}

export default App;