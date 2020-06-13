import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import {withRouter} from 'react-router-dom';
import { Typography, Box, Paper, IconButton, Button, Chip } from '@material-ui/core';
import {getQueryParam, searchPerson} from './data';
import Skeleton from '@material-ui/lab/Skeleton';
import appStyles from './styles';
import {getFullName} from './data';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FaceIcon from '@material-ui/icons/Face';
import { Link } from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import {getChildren, getParents} from './data';

function ChipRouterLink(props) {
    const { to, label } = props;
  
    const CustomLink = useMemo(
      () =>
          forwardRef((linkProps, ref) => (
              <RouterLink ref={ref} to={to} {...linkProps} />
          )),
      [to],
    );
  
    return (
        <Chip component={CustomLink} label={label} clickable {...props}/>
    );
}

function Profile(props) {
    const classes = appStyles();
    return (
        <>
        <Box className={classes.profileHeader}>
            <Link href="whatsapp://send?text=The text to share!" data-action="share/whatsapp/share">
                <Button className={classes.shareButton} startIcon={<WhatsAppIcon />}>Share on WhatsApp</Button>
            </Link>
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
                {getChildren(props.data, props.personData).map((child)=>{
                    return <ChipRouterLink className={classes.personChip} to={child.url} label={child.name} color="primary" icon={<FaceIcon />} />
                })}
            </Paper>
            <Paper variant="outlined" elevation={0} className={classes.profileCard}>
                <Typography className={classes.profileTextLabel}>Parents</Typography>
                {getParents(props.data, props.personData).map((child)=>{
                    if(typeof(child) == 'string') {
                        return <Chip className={classes.personChip} icon={<FaceIcon />} label={child} />
                    }
                    return <ChipRouterLink className={classes.personChip} to={child.url} label={child.name} color="primary" icon={<FaceIcon />} />
                })}
            </Paper>
            <Paper variant="outlined" elevation={0} className={classes.profileCard}>
                <Typography className={classes.profileTextLabel}>Other info</Typography>
                <Typography>{props.personData.other}</Typography>
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