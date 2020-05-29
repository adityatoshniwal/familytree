import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import { Typography } from '@material-ui/core';
import {getQueryParam, searchPerson} from './data';
import Skeleton from '@material-ui/lab/Skeleton';
import appStyles from './styles';

function Person(props) {
    const classes = appStyles();
    const [personData, setPersonData] = useState(null);
    useEffect(()=>{
        let key = getQueryParam(props.location, '/person', 'key')
        if(key) {
            setPersonData(searchPerson(props.data, key));
        }
    }, [props.location, props.data])

    console.log(personData);
    return (
        <>
        {props.data && personData &&
            <>
            <Typography variant="body2" className={classes.personTextLabel}>Name</Typography>
            <Typography>{personData.firstName}</Typography>
            <Typography>{personData.lastName}</Typography>
            <Typography>{personData.dob}</Typography>
            </>
        }
        {props.data && !personData &&
            <>
            <Typography>Person Not found</Typography>
            </>
        }       
        {!props.data &&
            <>
            <Skeleton variant="text" animation="wave"/>
            <Skeleton variant="rect" height={20} animation="wave"/>
            <Skeleton variant="text" animation="wave"/>
            <Skeleton variant="rect" height={20} animation="wave"/>
            <Skeleton variant="text" animation="wave"/>
            <Skeleton variant="rect" height={20} animation="wave"/>
            <Skeleton variant="text" animation="wave"/>
            <Skeleton variant="rect" height={20} animation="wave"/>
            </>
        }
        </>
    )
}

export default withRouter(Person);