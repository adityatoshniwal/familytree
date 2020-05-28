import React, { useState, useMemo, forwardRef } from 'react';
import appStyles from './styles';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton, AppBar, Container, Drawer, Toolbar, Typography, List, ListItem, ListItemText, Button, ListItemIcon, FormControl, OutlinedInput, InputAdornment, ListItemAvatar, Avatar } from '@material-ui/core';
import { signOut } from './auth';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const CustomLink = useMemo(
    () =>
        forwardRef((linkProps, ref) => (
            <Link ref={ref} to={to} {...linkProps} />
        )),
    [to],
  );

  return (
    <li>
      <ListItem button component={CustomLink} onClick={props.onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default function AppMenu(props) {
    let classes = appStyles();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleDrawer = (value) => {
        setMenuOpen(value);
    }

    if(!props.currentUser) {
        return <></>;
    }

    const closeDrawer = ()=>toggleDrawer(false);
    return (
        <>
            <AppBar position="sticky" color="default" elevation={2}>
                <Toolbar disableGutters variant="dense">                
                    <Container maxWidth="md" className={classes.searchBoxContainer}>
                        <FormControl variant="outlined" size="small" fullWidth>
                            <OutlinedInput
                                name="ref_id"
                                id="ref_id"
                                type='text'
                                startAdornment={
                                <>
                                    <InputAdornment position="start">
                                        <IconButton color="primary" onClick={()=>toggleDrawer(true)} className={classes.searchBoxButton}>
                                            <MenuIcon fontSize="default"/>
                                        </IconButton>
                                    </InputAdornment>              
                                </>                                    
                                }
                                endAdornment={
                                <>
                                    <InputAdornment position="end">
                                        <IconButton color="primary" className={classes.searchBoxButton}>
                                            <SearchIcon fontSize="default"/>
                                        </IconButton>
                                    </InputAdornment>              
                                </>
                                }
                            />
                        </FormControl>
                        <Typography variant="h6" noWrap>
                        </Typography>
                    </Container>
                </Toolbar>
            </AppBar>
            <Drawer anchor='left' open={menuOpen} onClose={closeDrawer}>
                <div className={classes.sideMenu}>
                    <List >
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="" src={props.currentUser.imgUrl} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography noWrap={true}>{props.currentUser.name}</Typography>}
                                secondary={<Typography noWrap={true}>{props.currentUser.email}</Typography>}
                            />
                        </ListItem>
                        <ListItemLink icon={<HomeIcon />} primary='Home' to='/home' onClick={closeDrawer}/>
                        <ListItemLink icon={<PersonAddIcon />} primary='Add new entry' to='/add' onClick={closeDrawer}/>
                        <ListItemLink icon={<InfoIcon />} primary='About' to='/about' onClick={closeDrawer}/>
                        <ListItem button onClick={()=>{signOut()}}>
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary='Sign out' />
                        </ListItem>                        
                    </List>
                </div>
            </Drawer>
        </>
    );
}