import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import login from '../loginimg.gif'
import { GetRequestLists } from '../Utils'


export default function PendingTransfer() {
  const [list , setlist] = useState([])
  const [isLogin , setisLogin] = useState(true)

  useEffect(()=>{
    GetRequestLists('/getTransferData' , setlist , setisLogin)
  })

  ////make a list map
  const Transfer = list.map((elements , index)=>{
    <>
      <div className='reqs' key={index}>
        <div className='req-detail'>
          <div>
            <span className='req-detail-head'>LandId</span> - {elements._LandId}
          </div>
          <div>
          <span className='req-detail-head'>Owner</span> - {elements._WalletAddress}
          </div>
          <div>
          <span className='req-detail-head'>Land Address</span> - {elements._LandAddress}
          </div>
        </div>
      </div>

    </>
  }) 

  if(isLogin){
    return (
      <>
      <div className='Creating-reqs'>
        {Transfer}
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