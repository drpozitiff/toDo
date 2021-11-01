import React, {useState, useEffect} from 'react';
import {Box, Tab, tabsClasses, Tabs, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {getBases, setCurrentBase, getFishInfo, getUserFishInfo} from "../../actions/index";
import {useDispatch, useSelector} from 'react-redux';

export const BasesTabs = () => {
    const [value, setValue] = useState(0);

    const bases = useSelector((state) => state.fish.bases);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBases());
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
        <Box justifyContent="center" sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                aria-label="visible arrows tabs example"
                sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                        '&.Mui-disabled': { opacity: 0.3 },
                    },
                }}
            >
                {
                    bases.map(function(key, index) {
                        return <Tab
                            key={key.baseId}
                            label={key.baseName}
                            onClick={()=>{
                                dispatch(setCurrentBase(key.baseId));
                            }}
                        />
                    })
                }
            </Tabs>
            <Button
                className="add-new"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'black'
                }}
            >
                <div className="addIcon"><AddIcon fontSize="small"/></div>
            </Button>
        </Box>
    );
};