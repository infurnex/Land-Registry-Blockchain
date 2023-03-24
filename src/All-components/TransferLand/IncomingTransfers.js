import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetRequestLists } from '../Utils'
import login from '../loginimg.gif'


export default function IncomingTransfers() {
  const [list , setlist] = useState([])
  const [isLogin , setisLogin] = useState(true)
  
  useEffect(()=>{
    GetRequestLists('/getIncomingTransfer', setlist , setisLogin)
  },[])


  const incomings = list.map((elements , index)=>{
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
  })
  if(isLogin){
    return (
      <>
      <div className='Creating-reqs'>
        {incomings}
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
