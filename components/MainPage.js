import React, {useState, useEffect, useRef} from 'react';
import SearchResult from './SearchResult';
import appStyles from './styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment, Box, FormControl, OutlinedInput, Container, Backdrop, Typography, CircularProgress } from '@material-ui/core';
import { Route } from 'react-router-dom';
import About from './About';
import Person from './Person';

export default function MainPage(props) {
    const [contentHeight, setContentHeight] = useState(0);
    let listParentRef = useRef(null);
    const classes = appStyles();

    useEffect(()=>{
        setContentHeight(listParentRef.current.getBoundingClientRect().height);
    });

    window.addEventListener('resize', ()=>{
        setContentHeight(listParentRef.current.getBoundingClientRect().height);
    })

    // window.gapi.client.sheets.spreadsheets.values.get({
    //     spreadsheetId: '15Wpn0Ng-THDo-B7FJLt0Co9vYGwkMZHE6HgJ0MkJwqo',
    //     range: 'Sheet1'
    // }).then((response) => {
    //     var result = response.result;
    //     var numRows = result.values ? result.values.length : 0;
    //     console.log(result.values);
    //     console.log(`${numRows} rows retrieved.`);
    // });

    return (
        <Container className={classes.contentBody} maxWidth="md">
            <Box className={classes.searchResultBox} ref={listParentRef}>
                <Route path="/search">
                    <SearchResult data={props.data} contentHeight={contentHeight}/>
                </Route>
                <Route path="/person">
                    <Person data={props.data}/>
                </Route>                
                <Route path="/about">
                    <About />
                </Route>
            </Box>
        </Container>
    )
}

