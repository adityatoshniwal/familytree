import React, {useState, useEffect, createRef, useRef} from 'react';
import SearchResult from './SearchResult';
import appStyles from './styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment, Box, FormControl, OutlinedInput, Container } from '@material-ui/core';

export default function ContentBody(props) {
    const [contentHeight, setContentHeight] = useState(0);
    let listParentRef = useRef(null);
    const classes = appStyles();

    useEffect(()=>{
        setContentHeight(listParentRef.current.getBoundingClientRect().height);
    });

    window.addEventListener('resize', ()=>{
        setContentHeight(listParentRef.current.getBoundingClientRect().height);
    })

    return (
        <Container className={classes.contentBody} maxWidth="md">
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
            <Box className={classes.searchResultBox} ref={listParentRef}>
                <SearchResult contentHeight={contentHeight}/>
            </Box>
        </Container>
    )
}