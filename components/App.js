import React, { useEffect, useState } from 'react';
import { Box, Backdrop, CircularProgress, Typography } from '@material-ui/core';
import ContentBody from './ContentBody'
import appStyles from './styles';
import AppMenu from './AppMenu';
import {loadGapiScript, initAuth2, getSignedInUser} from './auth';

export default function App() {
    const classes = appStyles();
    const [auth2Ready, setAuth2Ready] = useState(false);
    const [currentUser, setUser] = useState(null);

    /* On mount */
    useEffect(()=>{
        if(!auth2Ready) {
            loadGapiScript()
                .then(()=>{
                    initAuth2({
                        onSignInChanged: (response)=>{
                            console.log('onSignInChanged', response);
                            setUser(getSignedInUser());
                        },
                        onCurrentUserChanged: (response)=>{
                            console.log('onCurrentUserChanged', response);
                        }
                    }).then(()=>{
                        setAuth2Ready(true);
                    }).catch((error)=>{
                        console.log('Failed:Auth2 initialized...', error);
                    });
                })
                .catch((error)=>{
                    console.log('Failed to loadGapiScript', error);
                });
        }
    });

    if(!auth2Ready) {
        return (
            <Backdrop className={classes.loader} open={true}>
                <CircularProgress color="inherit" /><br/>
                <Typography className={classes.loader_text}>Loading...</Typography>
            </Backdrop>
        );
    } else {
        return(
            <Box className={classes.rootBox}>
                <AppMenu currentUser={currentUser}/>
                <ContentBody currentUser={currentUser}/>
            </Box>            
        )
    }
}