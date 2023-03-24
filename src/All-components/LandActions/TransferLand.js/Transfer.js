import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { SignMessage } from '../../Utils'
import login from '../../loginimg.gif'


export default function Transfer() {
  const [isLogin , setisLogin] = useState(true)
  const [landid , setlandid] = useState();
  const [walletAddress , setwalletAddress] = useState();
  const [profileName , setprofileName] = useState()

  const Submit = async () => {
    const signature = await SignMessage()
    if(signature){
      const resp = await axios.post('/initTransferOwnerShip' , {_LandId : landid , _TransferTo : walletAddress, _TransferProfileName : profileName , _Signature : signature})
      console.log(resp.data)
      if(resp.data === 'loginError'){
        setisLogin(false)
      }
      else if(resp.data.modifiedCount ===1){
        alert('Land NFT transfer initiated Successfully')
      }
      else if(resp.data.modifiedCount === 0){
        alert('transfer already initiated')
      }
      else{
        alert('unfortunate error has occured')
      }
    }
  }
  
  if(isLogin){
    return (
      <div className='center-main'>
          <div className='center-main-box'>
            <div className='center-main-heading'>
              Transfer Land NFT
            </div>
            <div className='center-main-body'>
              <div className='center-main-field'>
                <div>
                  Land ID -
                </div>
                <input onChange={(e)=>{setlandid(e.target.value)}}></input>
              </div>
              <div className='center-main-field'>
                <div>
                  Transfie Wallet Address -
                </div>
                <input onChange={(e)=>{setwalletAddress(e.target.value)}}></input>
              </div>
              <div className='center-main-field'>
                <div>
                  Transfie Profile Name -
                </div>
                <input onChange={(e)=>{setprofileName(e.target.value)}}></input>
              </div>
            </div>
            <div>
              <button className='landactions-navbar-buttons' onClick={Submit}>Submit</button>
            </div>
          </div>
      </div>
    )
  }
  else{
    return (
      <div className='profile-notlogin'>
      <img className='profile-login-img' src={login}></img>
      <Link to='/Login' style={{ textDecoration: 'none' }}>
        <div className='MAL-submit'>
          <button>Login</button>
        </div>
      </Link>
    </div>
    )
  }
  
}
