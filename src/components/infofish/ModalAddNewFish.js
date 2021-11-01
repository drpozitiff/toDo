import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';

const style = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Input = styled('input')({
    display: 'none',
});

export default function ModalAddNewFish() {
    const [open, setOpen] = useState(false);
    const [fishName, setFishName] = useState('');
    const [fishId, setFishId] = useState('');
    const [locations, setLocations] = useState('');
    const [bait, setBait] = useState('');
    const [position, setPosition] = useState('');
    const [minWeight, setMinWeight] = useState('');
    const [maxWeight, setMaxWeight] = useState('');
    const [time, setTime] = useState('');

    const [selectedPic, setSelectedPic] = useState('');

    const newFishObj = {
        fishName,
        fishId: selectedPic,
        locations,
        bait,
        position,
        weight: [minWeight.toString(), maxWeight.toString()],
        time
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const isAuth = useSelector((state) => state.users.isAuth);

    return (
        <div>
            {isAuth && <Button
                onClick={handleOpen}
                className="add-new"
                style={{
                    textAlign: "center",
                    color: 'black'
                }}
            >
                <div className="addIcon"><AddIcon fontSize="small"/></div>
                <Typography variant="caption">Добавить рыбу</Typography>
            </Button>}
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography variant="h6" >Введите данные о новой рыбе:</Typography>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Box sx={{display: 'block', justifyContent: 'center'}}>
                            <TextField onChange={(event)=>setFishName(event.target.value)} sx={{mt: 2}} label="Вид" variant="standard" />
                            <TextField onChange={(event)=>setLocations(event.target.value)} sx={{mt: 2}} label="Локации" variant="standard" />
                            <TextField onChange={(event)=>setBait(event.target.value)} sx={{mt: 2}} label="Наживка" variant="standard" />
                            <TextField onChange={(event)=>setPosition(event.target.value)} sx={{mt: 2}} label="Глубина" variant="standard" />
                            <TextField onChange={(event)=>setTime(event.target.value)} sx={{mt: 2}} label="Время" variant="standard" />
                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                <TextField onChange={(event)=>setMinWeight(event.target.value)} sx={{mt: 2}} label="Мин. вес" variant="standard" />
                                <TextField onChange={(event)=>setMaxWeight(event.target.value)} sx={{mt: 2, ml: 2}} label="Макс. вес" variant="standard" />
                            </Box>
                        </Box>
                        <Box>
                            <label htmlFor="icon-button-file">
                                <Input onChange={(event)=>{
                                    console.log(event);
                                    setSelectedPic(event.target.files[0].name)
                                }} accept="image/*" id="icon-button-file" type="file" />
                                <IconButton sx={{color: 'black'}} aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </Box>
                    </Box>
                    <Button
                        style={{ color: 'black'}}
                        onClick={()=>{
                            console.log('newFishObj', newFishObj);
                        }}
                    >Добавить</Button>
                </Box>
            </Modal>
        </div>
    );
}