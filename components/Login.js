import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import {signIn} from './auth';

export default function Login() {
    return(<>
        <GoogleButton
            onClick={()=>{signIn()}}
        />
    </>);
}