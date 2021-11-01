import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Grid, Badge, Box, Card, CardContent, Typography } from '@mui/material';
import Image from 'material-ui-image'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import {getBases, setCurrentBase} from "../../actions/index";


export const BaseInfoCard = () => {
    const bases = useSelector((state) => state.fish.bases);
    const currentBase = useSelector((state) => state.fish.currentBase);
    const dispatch = useDispatch();

    let locations = [];
    bases.map(key => {
        if (key.baseId === currentBase) {
            return locations = key.locations
        }
    });

    return(
        <ImageList sx={{ flexGrow: 1}} rowHeight={100} cols={3} >
            {locations.map((loc) => (
                <ImageListItem style={{maxWidth: 200, maxHeight: 130, display:'flex'}} justifyContent="center" key={loc.id}>
                    <Image
                        style={{paddingBottom: 0, paddingTop: 0, paddingRight: 0}}
                        imageStyle={{width: '100%', height: 100}} src={process.env.PUBLIC_URL + `/images/${currentBase}/Loc${loc.id}/Scene.jpg`}/>
                    <ImageListItemBar
                        sx={{
                            background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                        }}
                        subtitle={loc.id + ' ' + loc.name}
                        position="top"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    )
};