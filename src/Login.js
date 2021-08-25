import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import {auth,provider} from './firebase'
import { actionTypes } from "./reducer";
import { useStateValue } from './StateProver';

function Login() {
    const [{},dispatch] = useStateValue();
    
    const signIn = () =>{
        auth.signInWithPopup(provider)
        .then((result)=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            })
        })
        .catch((error)=>{
            alert(error.message)
        })
    }
    return (
        <div className='login'>
            <div className='login-container'>
                <img src='https://logos-world.net/wp-content/uploads/2020/05/WhatsApp-Logo.png'/>
            <div className='login-text'>
                <h1>Sign in to Whatsapp</h1>
            </div>
            <Button onClick={signIn}>Sign In With Google</Button>
            </div>
            
        </div>
    )
}

export default Login
