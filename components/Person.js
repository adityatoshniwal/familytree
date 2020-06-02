import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import { Typography, Box, Paper, IconButton } from '@material-ui/core';
import {getQueryParam, searchPerson} from './data';
import Skeleton from '@material-ui/lab/Skeleton';
import appStyles from './styles';
import {getFullName} from './data';
import ShareIcon from '@material-ui/icons/Share';
import {Link} from 'react-router-dom';
import {getPersonUrl, getPersonKey} from './data';

function Profile(props) {
    const classes = appStyles();
    return (
        <>
        <Box className={classes.profileHeader}>
            Person Info:
            <IconButton><ShareIcon /></IconButton>
        </Box>
        <Box className={classes.profileBody}>
            <Paper variant="outlined" elevation={0} className={classes.profileCard}>
                <Typography className={classes.profileTextLabel}>Name</Typography>
                <Typography>{getFullName(props.personData)}</Typography>
                <Typography className={classes.profileTextLabel}>DOB</Typography>
                <Typography>{props.personData.dob}</Typography>
                <Typography className={classes.profileTextLabel}>Gender</Typography>
                <Typography>{props.personData.gender}</Typography>                
            </Paper>
            <Paper variant="outlined" elevation={0} className={classes.profileCard}>
                <Typography className={classes.profileTextLabel}>From</Typography>
                <Typography>{props.personData.fromCity}</Typography>
                <Typography className={classes.profileTextLabel}>Currently residing in</Typography>
                <Typography>{props.personData.currCity}</Typography>
            </Paper>
            <Paper variant="outlined" elevation={0} className={classes.profileCard}>
                <Typography className={classes.profileTextLabel}>Children</Typography>
                    {props.personData.children.split(",").map((child)=> {
                        if(props.data[child.trim()]) {
                            return <Link to={props.data[child.trim()] ? props.data[child.trim()].url: ''}><Typography>{child}</Typography></Link>
                        } else {
                            return <Typography>{child}</Typography>
                        }
                    })}
            </Paper>        
        </Box>
        </>
    )
}

function Person(props) {
    const classes = appStyles();
    const [personData, setPersonData] = useState(null);
    useEffect(()=>{
        let key = getQueryParam(props.location, '/person', 'key')
        if(key && props.data) {
            setPersonData(props.data[key]);
        }
    }, [props.location, props.data])

    return (
        <>
        {props.data && personData &&
            <Profile data={props.data} personData={personData}/>
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