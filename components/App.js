import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { InputAdornment, Input, Box, FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import classes from './styles';
import ContentBody from './ContentBody'
import appStyles from './styles';
import AppMenu from './AppMenu';

export default function App() {
    const classes = appStyles();
    const [gapiLoaded, setGapiLoaded] = useState(false);

    const loadClientWhenGapiReady = (script) => {
        console.log('Trying To Load Client!');
        console.log(script)
        if(script.getAttribute('gapi_processed')){
            setGapiLoaded(true);
            window.gapi.client.init({
                'apiKey': 'AIzaSyBHLdeH6904EfzVpBM0vg8QqnZ0quH98ds',
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

    return (
        <Box className={classes.body}>
            <AppMenu />
            <Container className={classes.content} maxWidth="md">
                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        name="ref_id"
                        id="ref_id"
                        type='text'
                        endAdornment={
                        <>
                            <InputAdornment position="end">
                                <IconButton color="primary">
                                    <SearchIcon fontSize="default"/>
                                </IconButton>
                            </InputAdornment>              
                        </>
                        }
                    />
                </FormControl>
                <ContentBody></ContentBody>
            </Container>
        </Box>
    )
}