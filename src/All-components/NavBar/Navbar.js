import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from './clublogo.png'
export default function Navbar() {
  const [permanentul1, setpermanentul1] = useState('')
  const [permanentul2, setpermanentul2] = useState('')
  const [permanentul3, setpermanentul3] = useState('')
  const [permanentul4, setpermanentul4] = useState('')
  const [login , setlogin] = useState('hide')
  const [profile , setprofile] = useState('hide')
  const [profileName , setprofileName] = useState()

  useEffect(()=>{
    axios.get('/islogin').then((e)=>{
      if(e.data === 'loginError'){
        setlogin('login-register')
      }
      else{
        setprofile('profile')
        setprofileName(e.data)
        setlogin('hide')
      }
    })
    .catch((e)=>{
      setlogin('login-register')
    })
  })

  const setPermanentClass = (setter , className)=>{
    setpermanentul1('')
    setpermanentul2('')
    setpermanentul3('')
    setpermanentul4('')
    setter(className)
  }

  const setClass = (classname , setter , classs)=>{
    if(classname != ''){
    }
    else{
     setter(classs)
    }
  }


  return (
    <div className='nav-bar'>
      <div className='company-title'>
        <img className='company-logo' src={logo}>
        </img>
        <div className='company-name'>
          Land Registry
        </div>
      </div>
      <div className='navigators'>

      <Link to='/' style={{ textDecoration: 'none' , color: 'white'}}>
          <div className='navigators-pack' onPointerEnter={()=>{setClass(permanentul1, setpermanentul1 , 'underline')}} onClick={()=>{setPermanentClass(setpermanentul1 , 'permanentunderline')}}>
            <div>
              Home
            </div>
            <div className={permanentul1}></div>
          </div>
        </Link>


        <Link to='/Land/YourLand/myNft' style={{ textDecoration: 'none' , color: 'white'}}>
          <div className='navigators-pack' onPointerEnter={()=>{setClass(permanentul2, setpermanentul2 , 'underline')}} onClick={()=>{setPermanentClass(setpermanentul2 , 'permanentunderline')}} >
            <div>
              Land
            </div>
            <div className={permanentul2}></div>
          </div>
        </Link>
      

        <Link to='/Contact' style={{ textDecoration: 'none' , color: 'white'}}>
          <div className='navigators-pack' onPointerEnter={()=>{setClass(permanentul3, setpermanentul3 , 'underline')}} onClick={()=>{setPermanentClass(setpermanentul3 , 'permanentunderline')}}>
            <div>
              Contact
            </div>
            <div className={permanentul3}></div>
          </div>
        </Link>


        <Link to='/About' style={{ textDecoration: 'none' , color: 'white'}}>
          <div className='navigators-pack' onPointerEnter={()=>{setClass(permanentul4, setpermanentul4 , 'underline')}} onClick={()=>{setPermanentClass(setpermanentul4 , 'permanentunderline')}}>
            <div>
              About
            </div>
            <div className={permanentul4}></div>
          </div>
        </Link>


      </div>
      <div className='Utils'>
        <div className={login}>
          <Link to='/Login' style={{ textDecoration: 'none' , color : 'white'}}>
          <div className='login-register-button'>
            login
          </div>
          </Link>
          <Link to='/Registeruser' style={{ textDecoration: 'none' , color : 'white'}}>
          <div className='login-register-button'>
            register
          </div>
          </Link>
        </div>
        <div>
            <div className={profile}>
              <div className='profile-main'>
                <div>
                  {profileName}
                </div>
                <img>
                </img>
              </div>
                <div className='logout'>
                  Logout
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
