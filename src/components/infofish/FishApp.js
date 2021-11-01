import { Grid } from '@mui/material';
import { BasesTabs } from './BasesTabs';
import { BaseInfoCard } from './BaseInfoCard';
import FishTable from './FishTable';


const FishApp = () => {
    return(
        <Grid sx={{mt: 8, flexGrow: 1}} justifyContent="center" container spacing={2}>
            <Grid item lg={8} sm={11}>
                <BasesTabs/>
                <FishTable/>
            </Grid>
            <Grid item lg={3} sm={11}>
                <BaseInfoCard/>
            </Grid>
        </Grid>
    )
};

export default FishApp;