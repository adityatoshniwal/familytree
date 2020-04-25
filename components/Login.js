import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import {signIn} from './auth';
import { Box, Paper, Typography, Card, CardContent, CardActions, Grid } from '@material-ui/core';

export default function Login() {

    return(
        <Box margin="auto" textAlign="center">
            <Grid container>
                <Grid item></Grid>
                <Grid item sm={12}>
                    <Typography>Welcome to,</Typography>
                    <Typography variant="h6">Asawa Family tree.</Typography>
                    <Typography>You need to sign in to explore more information on the family heirarchy.</Typography>
                    <GoogleButton onClick={()=>{signIn()}} style={{margin: '1rem auto'}}/>
                </Grid>
                <Grid item></Grid>
            </Grid>
        </Box>
    );
}