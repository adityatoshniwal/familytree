import React, {useState, useEffect, createRef} from 'react';
import SearchResult from './SearchResult';
import { Box } from '@material-ui/core';
import appStyles from './styles';

export default function ContentBody(props) {
    const [contentHeight, setContentHeight] = useState(0);
    let listParentRef = createRef();
    const classes = appStyles();

    useEffect(()=>{
        setContentHeight(listParentRef.current.getBoundingClientRect().height - 50);
    });

    window.addEventListener('resize', ()=>{
        setContentHeight(listParentRef.current.getBoundingClientRect().height - 50);
    })
    return (
        <Box className={classes.fullBox} ref={listParentRef}>
            <SearchResult contentHeight={contentHeight}/>
        </Box>
    )
}