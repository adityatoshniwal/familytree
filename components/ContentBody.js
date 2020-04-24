import React, {useState, useEffect, createRef, useRef} from 'react';
import SearchPage from './SearchPage';
import Login from './Login';

export default function ContentBody(props) {
    if(!props.currentUser) {
        return(<Login />);
    } else {
        return(<SearchPage />);
    }
}