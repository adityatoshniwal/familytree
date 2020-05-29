import React, { useEffect, useState } from 'react';
import { Box, Backdrop, CircularProgress, Typography } from '@material-ui/core';
import appStyles from './styles';
import AppMenu from './AppMenu';
import {loadGapiScript, initAuth2, getSignedInUser} from './auth';
import {getSheetData} from './data';
import { HashRouter as Router } from 'react-router-dom';
import Login from './Login';
import MainPage from './MainPage';

export default function App() {
    const classes = appStyles();
    const [signinChecked, setSigninChecked] = useState(false);
    const [currentUser, setUser] = useState(null);
    const [isDataLoaded, setDataLoaded] = useState(false);
    const [data, setData] = useState(null);

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
                    }).then(()=>{
                        getSheetData()
                            .then((data)=>{
                                setData(data);
                                setDataLoaded(true);
                            })
                            .catch((error)=>{
                                console.log(error);
                            });
                    })
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
            <Router>
                <Box className={currentUser ? classes.rootBox: classes.loginRootBox}>
                    {!currentUser && <Login />}
                    {currentUser && 
                        <>
                        <AppMenu currentUser={currentUser}/>
                        <MainPage isDataLoaded={isDataLoaded} data={data}/>
                        </>
                    }
                </Box>
            </Router>         
        )
    }
}