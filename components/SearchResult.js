import React, {useState, useEffect} from 'react';
import { Box, ListItem, ListItemText, Typography, Divider, withMobileDialog } from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import appStyles from './styles';

export default function SearchResult(props) {
    const classes = appStyles();
    const [searchData, setSearchData] = useState([
        {'name': 'Aditya', DOB: 'NA', mother: 'Sarala Toshniwal'},
        {'name': 'Aditya', DOB: 'NA', mother: 'Sarala Toshniwal'},
        {'name': 'Aditya', DOB: 'NA', mother: 'Sarala Toshniwal'},
        {'name': 'Aditya', DOB: 'NA', mother: 'Sarala Toshniwal'},
        {'name': 'Aditya', DOB: 'NA', mother: 'Sarala Toshniwal'},
        {'name': 'Aditya', DOB: 'NA', mother: 'Sarala Toshniwal'},
        {'name': 'Aditya', DOB: 'NA', mother: 'Sarala Toshniwal'},
        {'name': 'Aditya', DOB: 'NA', mother: 'Sarala Toshniwal'},
        {'name': 'Aditya', DOB: 'NA', mother: 'Sarala Toshniwal'},
        {'name': 'Aditya', DOB: 'NA', mother: 'Sarala Toshniwal'},
        {'name': 'Aditya', DOB: 'NA', mother: 'Sarala Toshniwal'},
        {'name': 'Aditya', DOB: 'NA', mother: 'Sarala Toshniwal'},
        {'name': 'Aditya', DOB: 'NA', mother: 'Sarala Toshniwal'},
        {'name': 'Aditya', DOB: 'NA', mother: 'Sarala Toshniwal'},
        {'name': 'Aditya', DOB: 'NA', mother: 'Sarala Toshniwal'},
        {'name': 'Aditya', DOB: 'NA', mother: 'Sarala Toshniwal'}
    ]);

    const [listHt, setListHt] = useState(0);

    const listParentRef = React.createRef();

    let ListItemRenderer = (props) => {
        let person = props.data[props.index];
        return (
            <Box key={props.key} style={props.style}>
                <ListItem button>
                    <ListItemText
                        primary={person.name}
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                            >
                                {person.DOB}
                            </Typography>
                            {person.mother}
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
            <FixedSizeList height={props.contentHeight} width={'100%'} itemSize={72} itemCount={searchData.length} itemData={searchData}>
                {ListItemRenderer}
            </FixedSizeList>
        </Box>
    )
}