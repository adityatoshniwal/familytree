import React, {useState, useEffect, createRef, useRef} from 'react';
import SearchPage from './SearchPage';
import appStyles from './styles';
import { Backdrop, Typography, CircularProgress, Button } from '@material-ui/core';
import GoogleButton from 'react-google-button'

export default function ContentBody(props) {
    const classes = appStyles();

    const onSignIn = () => {
        window.gapi.auth2.getAuthInstance().signIn();
    }

    const onSignOut = () => {
        window.gapi.auth2.getAuthInstance().signOut();
    }

    const responseGoogle = (response) => {
        console.log(response);
    }
    return(<>
        <GoogleButton
            onClick={onSignIn}
        />
        <Button onClick={onSignOut}>Sign out</Button>
    </>)
    return(<SearchPage />);
}