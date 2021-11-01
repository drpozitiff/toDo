import findFishIcon from './icons/FindFishIcon_Light.png';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export const SearchFish = ({setChosenFishes}) => {
    return (
        <TextField
            label=""
            placeholder="Поиск"
            variant="standard"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <img
                            style={{
                                width: 18,
                                imageRendering: 'auto'
                            }}
                            alt=""
                            src={findFishIcon} />
                    </InputAdornment>
                ),
            }}
            onChange={(event) => setChosenFishes(event.target.value)}
        />
    )
};