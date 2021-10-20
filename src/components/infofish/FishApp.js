import { Grid } from '@mui/material';
import { BasesTabs } from './BasesTabs';
import { BaseInfoCard } from './BaseInfoCard';
import FishTable from './FishTable';


const FishApp = () => {
    return(
        <Grid sx={{mt: 8, flexGrow: 1}} justifyContent="center" container spacing={2}>
            <Grid item xs={9}>
                <BasesTabs/>
                <FishTable/>
            </Grid>
            <Grid item xs={3}>
                <BaseInfoCard/>
            </Grid>
        </Grid>
    )
};

export default FishApp;