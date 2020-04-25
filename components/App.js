import React, { useEffect, useState } from 'react';
import { Box, Backdrop, CircularProgress, Typography } from '@material-ui/core';
import ContentBody from './ContentBody'
import appStyles from './styles';
import AppMenu from './AppMenu';
import {loadGapiScript, initAuth2, getSignedInUser} from './auth';

export default function App() {
    const classes = appStyles();
    const [signinChecked, setSigninChecked] = useState(false);
    const [currentUser, setUser] = useState(null);

    /* On mount */
    useEffect(()=>{
        if(!signinChecked) {
            loadGapiScript()
                .then(()=>{
                    initAuth2({
                        onSignInChanged: (response)=>{
                            console.log('onSignInChanged', response);
                            setUser(getSignedInUser());
                            setSigninChecked(true);
                        },
                        onCurrentUserChanged: (response)=>{
                            console.log('onCurrentUserChanged', response);
                            setSigninChecked(true);
                        }
                    }).then(()=>{})
                    .catch((error)=>{
                        console.log('Failed:Auth2 initialized...', error);
                    });
                })
                .catch((error)=>{
                    console.log('Failed to loadGapiScript', error);
                });
        }
    });

    if(!signinChecked) {
        return (
            <Backdrop className={classes.loader} open={true}>
                <CircularProgress color="inherit" /><br/>
                <Typography className={classes.loader_text}>Loading...</Typography>
            </Backdrop>
        );
    } else {
        return(
            <Box className={currentUser ? classes.rootBox: classes.loginRootBox}>
                <AppMenu currentUser={currentUser}/>
                <ContentBody currentUser={currentUser}/>
            </Box>            
        )
    }
}