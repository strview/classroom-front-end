import React from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import PropTypes from 'prop-types'

const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
}
  
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabbedLayout = ({tabLabels, tabPanels}) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    aria-label="Tabbed Layout"
                    textColor="secondary"
                    indicatorColor="secondary"
                    >
                    {
                        tabLabels.map((label, index) => {
                            return (
                                <Tab key={index} label={label} {...a11yProps(index)} />
                            )
                        })
                    }
                </Tabs>
            </Box>
            {
                tabPanels.map((panel, index) => {
                    return (
                        <CustomTabPanel key={index} value={value} index={index}>
                            {panel}
                        </CustomTabPanel>
                    )
                })
            }
        </Box>
    )
}

export default TabbedLayout