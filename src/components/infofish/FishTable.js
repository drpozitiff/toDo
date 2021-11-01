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
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {SearchFish} from './SearchFish'
import ModalAddNewFish from './ModalAddNewFish'
import {TempLearnLoadFilesComponent} from './TempLearnLoadFilesComponent'
import {getFishInfo, getUserFishInfo} from "../../actions/index";
import {useDispatch, useSelector} from 'react-redux';

function Row(props) {
    const { fishesInfo, userId, userFishInfo } = props;
    const [open, setOpen] = useState(false);
    const toogle = !(userId && userFishInfo.length);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        disabled={toogle}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{fishesInfo.fishName}</TableCell>
                <TableCell>
                    <img style={{width: 70}}
                       src={process.env.PUBLIC_URL + `/images/_fish/${fishesInfo.fishId}.png`}
                    />
                </TableCell>
                <TableCell>{fishesInfo.locations}</TableCell>
                <TableCell>{fishesInfo.bait}</TableCell>
                <TableCell>{fishesInfo.position}</TableCell>
                <TableCell>{`${fishesInfo.weight[0]} / ${fishesInfo.weight[1]}`}</TableCell>
                <TableCell>{fishesInfo.time}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'none'}} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box>
                            <Table size="small">
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
                                        if(fishesInfo.fishId === fishInfo.fishId && userId == fishInfo.userId) {
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
    let fishesInfo = useSelector((state) => state.fish.fishInfo);
    const currentBase = useSelector((state) => state.fish.currentBase);
    const userId = useSelector((state) => state.users.userId);
    const isAuth = useSelector((state) => state.users.isAuth);
    const userFishInfo = useSelector((state) => state.fish.userFishInfo) || [];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFishInfo(currentBase));
        userId && dispatch(getUserFishInfo(currentBase));
    }, [currentBase, userId]);

    const [chosenFishes, setChosenFishes] = useState();


    const filterFishes = (chosenFishes = '', fishesInfo) => {
        const chosenFishesArray = chosenFishes?.split(' ');
        const filteredFishes = fishesInfo?.filter((currentFish) => {
            for(let i = 0; i < chosenFishesArray.length; i++){
                let regex = new RegExp(chosenFishesArray[i].trim().toLowerCase());
                let match = regex.test(currentFish['fishName'].trim().toLowerCase());
                if(chosenFishesArray[i] && match) return true;
            }
        });
        return filteredFishes;
    };

    fishesInfo = (chosenFishes) ? filterFishes(chosenFishes, fishesInfo) : fishesInfo;

    return (<>
        <TableContainer component={Paper}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', minHeight: '0 !important', p: 1 }}>
                <SearchFish setChosenFishes={setChosenFishes}/>
                <ModalAddNewFish/>
            </Toolbar>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Вид</TableCell>
                        <TableCell>Изображение</TableCell>
                        <TableCell>Локация</TableCell>
                        <TableCell>Наживка</TableCell>
                        <TableCell>Глубина</TableCell>
                        <TableCell>Вес&nbsp;(g)</TableCell>
                        <TableCell>Время</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fishesInfo && fishesInfo?.map((fishesInfo) => {
                        const currentFishInfo = userFishInfo.filter((fishInfo) => fishInfo.fishId === fishesInfo.fishId);
                        return <Row key={fishesInfo.fishId} fishesInfo={fishesInfo} userId={userId} userFishInfo={currentFishInfo} />
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <TempLearnLoadFilesComponent/>
    </>);
}