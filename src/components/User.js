import * as React from 'react';
import connect from "react-redux/es/connect/connect";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const User = ({userName, userEmail}) => {
    return (
        <Card sx={{ minWidth: 275, mt: 2.5 }}>
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                            Logged user:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                            {userName}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                            Email:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                            {userEmail}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

const mapStateToProps = (state) => {
    const userName = state.users.userName;
    const userEmail = state.users.userEmail;
    return {
        userName: userName,
        userEmail: userEmail
    }
};

export default connect(mapStateToProps, null)(User);