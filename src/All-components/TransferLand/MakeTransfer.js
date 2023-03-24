import React, { useEffect, useState } from 'react'
import login from '../loginimg.gif'
import { Link } from 'react-router-dom'
import { ethers, utils } from 'ethers'
import axios from 'axios'
import { SignMessage } from '../Utils'



export default function MakeTransfer() {
  const [list , setlist] = useState([])
  const [isLogin , setisLogin] = useState(true)
  const [Landid , setLandid] = useState()
  const [transferto , setTransferto] = useState()
  const [LandPrice , setLandPrice] = useState()

  const Approve = async ()=>{
    const signature = await SignMessage()
    console.log(signature)
    if(signature){
      const resp = await axios.post('/initTransferOwnerShip', {
        _LandId : Landid,
        _TransferTo : transferto,
        _TransferPrice : LandPrice,
        _Signature : signature
      })
      if(resp.data === 'loginError'){
        setisLogin(false)
      }
      else if(resp.data === ''){
        alert('You do not Own Land with id -' + {Landid})
      }
      else if(resp.data === 'Wrong Signature'){
        alert('Wrong Signature')
      }
      else{
        alert('Transfer was Successfully initialised')
      }
    }
    else{
    }
  }

  if(isLogin){
    return (
      <>
      <div>
        <div>
          Land ID
        </div>
        <input type='text' onChange={(e)=>{setLandid(e.target.value)}}></input>
      </div>
      <div>
        <div>
          Transfer to -
        </div>
        <input type='text'  onChange={(e)=>{setTransferto(e.target.value)}}></input>
      </div>
      <div>
        <div>
          Land Price
        </div>
        <input type='text' onChange={(e)=>{setLandPrice(e.target.value)}}></input>
      </div>
      <div>
        <button onClick={Approve}>Approve</button>
      </div>
      </>
  )
  }
  else{
    return(
      <>
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
}
