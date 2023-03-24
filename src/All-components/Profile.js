import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../All-CSS/Profile.css'
import login from './loginimg.gif'
import pic from './profilepic.png'

export default function Profile() {

  const [islogin , setlogin] = useState(false)
  const [proaddclass , setproaddclass] = useState('profile-add-not')
  const [profilewalletclass , setprofilewalletclass] = useState('hide')
  const [walletaddclass , setwalletaddclass] = useState('profile-add-not')
  const [profiledata  , setprofiledata] = useState({})

  useEffect (()=>{
    axios.get('/profile')
    .then((e)=>{
      console.log(e)
      if(e.data == 'loginError'){
        setlogin(false)
      }
      else{
        setlogin(true)
        setprofiledata(e.data)
        setwidth(String(e.data.land.length*120))
        if(e.data.userinfo.Address === null){
          setproaddclass('profile-add-not')
        }
        else{
          setproaddclass('hide')
        }
        if(e.data.userinfo.WalletAddress === null){
          setwalletaddclass('profile-add-not')
          setprofilewalletclass('hide')
        }
        else{
          setwalletaddclass('hide')
          setprofilewalletclass('profile-wallet')
        }
      }
    })
    .catch((e)=>{console.log(e)})
  },[])

  const [btnmsg , setbtnmsg] = useState('View wallet Address')
  const [addressVisiblity , setaddressVisibility] = useState('profile-wallet-address-hide');
  const showAddress = ()=>{
    if(btnmsg == 'hide'){
      setbtnmsg('View wallet Address')
      setaddressVisibility('profile-wallet-address-hide')
    }
    else{
      setbtnmsg('hide')
      setaddressVisibility('profile-wallet-address-show')
    }
  }

  const [width , setwidth] = useState()

  if(islogin === false){
    return(
      <>
      <div className='desktop-navgap'></div>
      <div className='profile-notlogin'>
        <img className='profile-login-img' src={login}></img>
        <Link to='/Login' style={{ textDecoration: 'none' }}>
          <div className='MAL-submit'>
            <button>Login</button>
          </div>
        </Link>
      </div>

      </>
    )
  }
  else{
    return (
      <>
      <div className='desktop-navgap'></div>
      <div className='profile-all'>
        <div className='profile-main'>
          <div className='profile-main-S1'>
            <div className='profile-img'>
              <img src={pic}>
              </img>
              <div className='profile-name'>
              #{profiledata.userinfo.ProfileName}
              </div>
            </div>
            <div className='profile-discription'>
              <div>
                <div className='profile-heading'>Name</div>
                <div className='profile-value'>{profiledata.userinfo.Name}</div>
              </div>
              <div>
                <div className='profile-heading'>Phone number</div>
                <div className='profile-value'>{profiledata.userinfo.Phone}</div>
              </div>
              <div>
                <div className='profile-heading'>Email Address</div>
                <div className='profile-value'>{profiledata.userinfo.Email}</div>
              </div>
              <div>
              <div className='profile-heading'>Residencial Address</div>
                <div className='profile-value'>{profiledata.userinfo.Address}</div>
                <Link to = '/Registeraddress' style={{ textDecoration: 'none' }}>
                <div className={proaddclass}>
                  <button>Register Address</button>
                </div>
                </Link>
              </div>
            </div>
          </div>
          <div className='profile-part'></div>
          <div className='profile-main-S2'>
          <div className='profile-heading'>Owned Land-NFTs</div>
          <div className='profile-main-S2-land'>
              <div style={{width: width , display :'flex' , justifyContent : 'center'}}>
                {/* <div className='profile-land-cards'>Land Id- 1234</div> */}
              </div>
          </div>
          <div className='profile-heading'>other Headings</div>
          </div>
        </div>
        <div className={profilewalletclass}>
          <button className='profile-wallet-btn' onClick={showAddress}>
            {btnmsg}
          </button>
          <div className={addressVisiblity}>
            {profiledata.userinfo.WalletAddress}
          </div>
        </div>
        <Link to = '/Registerwallet' style={{ textDecoration: 'none' , textAlign : 'center'}}>
          <div className={walletaddclass}>
            <button>Register Address</button>
          </div>
        </Link>
      </div>
      
      
      </>
    )
  }
}
