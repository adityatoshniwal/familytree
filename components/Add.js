import React from 'react';
import { Typography, Box } from '@material-ui/core';
import appStyles from './styles';

export default function Add(props) {
  const classes = appStyles();
  return (
    <Box className={classes.notAvaialableBox}>
      <Typography variant="h6">Currently not available</Typography>
    </Box>
  );
}