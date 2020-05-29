import React, {useState, useEffect, useMemo, forwardRef} from 'react';
import { Box, ListItem, ListItemText, Typography, Divider, withMobileDialog } from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import appStyles from './styles';
import { Link, withRouter } from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';
import {getPersonKey} from './data';

function SearchResult(props) {
    const classes = appStyles();
    const [searchData, setSearchData] = useState([]);

    useEffect(()=>{
        if(props.data) {
            setSearchData(props.data);
        }
    }, [props.data])

    const listParentRef = React.createRef();
      
    let ListItemRenderer = (props) => {
        let person = props.data[props.index];
        let name = person.firstName + ' ' +person.lastName;
        
        const CustomLink = useMemo(
            () =>
                forwardRef((linkProps, ref) => (
                    <Link ref={ref} to={'/person?key='+getPersonKey(person)} {...linkProps} />
                )),
            [name],
        );

        return (
            <Box key={props.key} style={props.style}>
                <ListItem button component={CustomLink}>
                    <ListItemText
                        primary={person.firstName + ' ' +person.lastName}
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                            >
                                {person.dob}
                            </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider/>
            </Box>    
        );
    }


    return (
        <Box className={classes.fullBox} ref={listParentRef}>
            {props.data &&
            <FixedSizeList height={props.contentHeight} width={'100%'} itemSize={72} itemCount={searchData.length} itemData={searchData}>
                {ListItemRenderer}
            </FixedSizeList>
            }
            {!props.data &&
                <>
                <Skeleton variant="text" animation="wave"/>
                <Skeleton variant="rect" height={60} animation="wave"/>
                <Divider/>
                <Skeleton variant="text" animation="wave"/>
                <Skeleton variant="rect" height={60} animation="wave"/>
                <Divider/>
                <Skeleton variant="text" animation="wave"/>
                <Skeleton variant="rect" height={60} animation="wave"/>                                
                </>
            }
        </Box>
    )
}

export default withRouter(SearchResult);