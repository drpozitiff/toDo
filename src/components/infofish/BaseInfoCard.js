import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Grid, Badge, Box, Card, CardContent, Typography } from '@mui/material';
import Image from 'material-ui-image'

import {getBases, setCurrentBase} from "../../actions/index";


export const BaseInfoCard = () => {
    const bases = useSelector((state) => state.fish.bases);
    const currentBase = useSelector((state) => state.fish.currentBase);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentBase(bases[0]?.baseId));
    },[bases]);

    let locations = [];
    bases.map(key => {
        if (key.baseId === currentBase) {
            return locations = key.locations
        }
    });

    return(
        <Grid sx={{flexGrow: 1}} justifyContent="center" container spacing={2}>
            {
                locations.map(loc => {
                    return(
                        <Grid sx={{ flexGrow: 1}} item xs={4}>
                            <Card variant="outlined" sx={{maxHeight: 130}}>
                                <CardContent  sx={{p:1}}>
                                    <Typography sx={{ fontSize: 11 }} color="text.secondary" gutterBottom>
                                        {`${loc.id} ${loc.name}`}
                                    </Typography>
                                    <Image imageStyle={{width: '100%', height: '62.5%'}}
                                        src={process.env.PUBLIC_URL + `/images/${currentBase}/Loc${loc.id}/Scene.jpg`}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
};