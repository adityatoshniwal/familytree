import React, { useState } from 'react';
import appStyles from './styles';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton, AppBar, Container, Drawer, Toolbar, Typography, List, ListItem, ListItemText, Button, ListItemIcon, FormControl, OutlinedInput, InputAdornment, ListItemAvatar, Avatar } from '@material-ui/core';
import { signOut } from './auth';

export default function AppMenu(props) {
    let classes = appStyles();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleDrawer = (value) => {
        setMenuOpen(value);
    }

    if(!props.currentUser) {
        return <></>;
    }

    return (
        <>
            <AppBar position="sticky" color="default" elevation={2}>
                <Toolbar disableGutters variant="dense">
                    <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={()=>toggleDrawer(true)}
                        >
                            <MenuIcon />
                    </IconButton>                    
                    <Container maxWidth="md">
                        <FormControl variant="outlined" size="small" fullWidth>
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
                        <Typography variant="h6" noWrap>
                        </Typography>
                    </Container>
                </Toolbar>
            </AppBar>
            <Drawer anchor='left' open={menuOpen} onClose={()=>toggleDrawer(false)}>
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
                        <ListItem button>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary='Home' />
                        </ListItem>                        
                        <ListItem button>
                            <ListItemIcon><PersonAddIcon /></ListItemIcon>
                            <ListItemText primary='Add new entry' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><InfoIcon /></ListItemIcon>
                            <ListItemText primary='About' />
                        </ListItem>
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