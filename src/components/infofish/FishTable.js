import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import {getFishInfo} from "../../actions/index";
import {useDispatch, useSelector} from 'react-redux';

const userFishInfo = [
    {
        fishId: '1001',
        userId: 5565556,
        location: 1,
        fossa: '4.33 снасти',
        bait: 'хлеб, червь',
        otherInfo: 'внахлыст ночь'
    },
    {
        fishId: '1001',
        location: 2,
        fossa: '5.77 снасти',
        bait: 'хлеб, червь',
        otherInfo: 'внахлыст ночь'
    },
    {
        fishId: '1002',
        location: 4,
        fossa: '5.33 снасти',
        bait: 'мол',
        otherInfo: 'дно ночь'
    }
];


function Row(props) {
    const { fishesInfo } = props;
    const [open, setOpen] = useState(false);


    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{fishesInfo.fishName}</TableCell>
                <TableCell align="right">{fishesInfo.locations}</TableCell>
                <TableCell align="right">{fishesInfo.bait}</TableCell>
                <TableCell align="right">{fishesInfo.position}</TableCell>
                <TableCell align="right">{`${fishesInfo.weight[0]} / ${fishesInfo.weight[1]}`}</TableCell>
                <TableCell align="right">{fishesInfo.time}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Локация</TableCell>
                                        <TableCell>Ямка</TableCell>
                                        <TableCell>Наживка</TableCell>
                                        <TableCell>Доп. информация</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userFishInfo.map((fishInfo) => {
                                        if(fishesInfo.fishId === fishInfo.fishId) {
                                            return (
                                                <TableRow key={fishInfo.fishId}>
                                                <TableCell component="th" scope="row">{fishInfo.location}</TableCell>
                                                <TableCell>{fishInfo.fossa}</TableCell>
                                                <TableCell>{fishInfo.bait}</TableCell>
                                                <TableCell>{fishInfo.otherInfo}</TableCell>
                                                </TableRow>
                                            )
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function FishTable() {
    const fishesInfo = useSelector((state) => state.fish.fishInfo);
    const bases = useSelector((state) => state.fish.bases);
    const dispatch = useDispatch();
    console.log("bases[0]?.baseId)",bases[0]?.baseId)
    useEffect(() => {
        dispatch(getFishInfo(bases[0]?.baseId));
    }, [bases]);

    console.log("fishInfo",fishesInfo);
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Рыба</TableCell>
                        <TableCell align="right">Локация</TableCell>
                        <TableCell align="right">Наживка</TableCell>
                        <TableCell align="right">Глубина</TableCell>
                        <TableCell align="right">Вес&nbsp;(g)</TableCell>
                        <TableCell align="right">Время</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fishesInfo && fishesInfo?.map((fishesInfo) => (
                        <Row key={fishesInfo.fishId} fishesInfo={fishesInfo} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}