import React, {useState, useEffect, createRef, useRef} from 'react';
import SearchPage from './SearchPage';
import appStyles from './styles';
import { Backdrop, Typography, CircularProgress } from '@material-ui/core';

export default function ContentBody(props) {
    const classes = appStyles();

    return(<SearchPage />);
}