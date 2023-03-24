import axios from 'axios';
import React, { useState } from 'react'

export default function Login() {
    const [pn , setpn] = useState();
    const [pp , setpp] = useState();
    const [successLogin , setsuccessLogin] = useState();

    const loginReq = async () =>{
        const res = await axios({
            method : 'post',
            url : '/login',
            data : {
                profile_name : pn,
                profile_passward : pp
            }
        })
        console.log(res.data);
        if(res.data === "Success"){
            setsuccessLogin(res.data);
        }
        else{
            alert('Invalid Username or Wrong Passward')
        }
    } 

    if(successLogin === 'Success'){
        return(
            <div>
              <div className='desktop-navgap'></div>
              <div className='ru-main-div'>
                <h1 className='ru-main-div-heading'>
                  Login
                </h1>
                <h2 className='ru-confirm'> 
                    Successfully logged in!
                </h2>
              </div>
            </div>
        )
    }
    else{
        return (
            <div>
              <div className='desktop-navgap'></div>
              <div className='ru-main-div'>
                <h1 className='ru-main-div-heading'>
                  Login
                </h1>
                <div className='ru-main-div-div-div'>
                    <div>
                        <p>
                        Profile Name
                        </p>
                        <input type='text' onChange={(e)=> {setpn(e.target.value)} }>
                        </input>
                    </div>
                    <div>
                        <p>
                        Profile Passward
                        </p>
                        <input type='password' onChange={(e)=> {setpp(e.target.value)} }>
                        </input>
                    </div>
                    <button className='landactions-navbar-buttons' style={{width : '200px'}} onClick={loginReq}>
                        Login
                    </button>
                </div>        
              </div>
            </div>
        )
    }
  
}
