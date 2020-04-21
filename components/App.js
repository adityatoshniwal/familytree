import React, { useEffect, useState } from 'react';
import { Box, Backdrop, CircularProgress, Typography } from '@material-ui/core';
import ContentBody from './ContentBody'
import appStyles from './styles';
import AppMenu from './AppMenu';

export default function App() {
    const classes = appStyles();
    const [gapiLoaded, setGapiLoaded] = useState(false);

    if(window.gapi && window.gapi.auth2) {
        let GoogleAuth = window.gapi.auth2.getAuthInstance();
        if(GoogleAuth.isSignedIn.get()) {
            window.gapi.client.setToken({access_token:GoogleAuth.currentUser.get().getAuthResponse().id_token});
            window.gapi.client.init({
                // 'apiKey': 'AIzaSyBHLdeH6904EfzVpBM0vg8QqnZ0quH98ds',
                'clientId': '866540362548-aauglbaa2770ip7idrago766h7tuitaj.apps.googleusercontent.com',
                'scope': 'https://www.googleapis.com/auth/spreadsheets',
                // Your API key will be automatically added to the Discovery Document URLs.
                'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            }).then(function() {
                console.log('success...');
                return window.gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: '15Wpn0Ng-THDo-B7FJLt0Co9vYGwkMZHE6HgJ0MkJwqo',
                    range: 'A1:A1'
                }).then((response) => {
                    var result = response.result;
                    var numRows = result.values ? result.values.length : 0;
                    console.log(result.values);
                    console.log(`${numRows} rows retrieved.`);
                });
            }).then(function(response) {
                console.log(response.result);
            }, function(reason) {
                console.log('Error: ' + reason.result.error.message);
            });          
        }
    }
    const loadClientWhenGapiReady = (script) => {
        console.log('Trying To Load Client!');
        console.log(script)
        if(script.getAttribute('gapi_processed')){
            window.gapi.load('auth2', function() {
                window.gapi.auth2.init({ux_mode: 'redirect'})
                    .then(()=>{
                        let GoogleAuth = window.gapi.auth2.getAuthInstance();
                        setGapiLoaded(true);
                        var signinChanged = function (val) {
                            console.log('Signin state changed to ', val);
                            // document.getElementById('signed-in-cell').innerText = val;
                            if(true) {
                                window.gapi.client.sheets.spreadsheets.values.get({
                                    spreadsheetId: '15Wpn0Ng-THDo-B7FJLt0Co9vYGwkMZHE6HgJ0MkJwqo',
                                    range: 'Sheet1'
                                }).then((response) => {
                                    var result = response.result;
                                    var numRows = result.values ? result.values.length : 0;
                                    console.log(result.values);
                                    console.log(`${numRows} rows retrieved.`);
                                });                                
                            }
                        };
                        
                        
                        /**
                         * Listener method for when the user changes.
                         *
                         * @param {GoogleUser} user the updated user.
                         */
                        var userChanged = function (user) {
                            console.log('User now: ', user);
                            // googleUser = user;
                            // updateGoogleUser();
                            // document.getElementById('curr-user-cell').innerText =
                            //     JSON.stringify(user, undefined, 2);
                        };
                    
                        GoogleAuth.isSignedIn.listen(signinChanged);
                    
                        GoogleAuth.currentUser.listen(userChanged);                        
                    });
            });

            // window.gapi.client.init({
            //     'apiKey': 'AIzaSyBHLdeH6904EfzVpBM0vg8QqnZ0quH98ds',
            //     // Your API key will be automatically added to the Discovery Document URLs.
            //     'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            // }).then(function() {
            //     console.log('success...');
            //     setGapiLoaded(true);
            // }).then(function(response) {
            //     console.log(response.result);
            // }, function(reason) {
            //     console.log('Error: ' + reason.result.error.message);
            // });
        }
        else{
            console.log('Client wasn\'t ready, trying again in 100ms');
            setTimeout(() => {loadClientWhenGapiReady(script)}, 100);
        }
    }

    /* On mount */
    useEffect(()=>{
        if(!gapiLoaded) {
            console.log('Initializing GAPI...');
            console.log('Creating the google script tag...');
        
            const script = document.createElement("script");
            script.onload = () => {
            console.log('Loaded script, now loading our api...')
            // Gapi isn't available immediately so we have to wait until it is to use gapi.
            loadClientWhenGapiReady(script);
            };
            script.src = "https://apis.google.com/js/client.js";
            
            document.body.appendChild(script);
        }
    });

    if(!gapiLoaded) {
        return (
            <Backdrop className={classes.loader} open={true}>
                <CircularProgress color="inherit" /><br/>
                <Typography className={classes.loader_text}>Loading...</Typography>
            </Backdrop>
        );
    } else {
        return(
            <Box className={classes.rootBox}>
                <AppMenu />
                <ContentBody gapiLoaded={gapiLoaded}/>
            </Box>            
        )
    }
}