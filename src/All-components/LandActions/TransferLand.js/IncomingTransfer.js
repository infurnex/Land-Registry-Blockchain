import React, { useEffect, useState } from 'react'
import { GetRequestLists, PostRequestforApproval, SignMessage } from '../../Utils'
import { Link } from 'react-router-dom'
import login from '../../loginimg.gif'



export default function IncomingTransfer() {
    const [list , setlist] = useState([])
    const [isLogin , setisLogin] = useState(true)

    useEffect(()=>{
      GetRequestLists('/getIncomingTransfer', setlist , setisLogin)
    },[])

      const Approve = async (landid , walletaddress , profilename)=>{
        const signature = await SignMessage()
          if(signature){
            PostRequestforApproval('/TransferConfirmation' , {
              _signature : signature,
              _LandId : landid,
              _WalletAddress : walletaddress,
              _ProfileName : profilename
            } , GetRequestLists, "/getIncomingTransfer", setlist, setisLogin)
          }
    }

  const incomings = list.map((elements , index)=>{
    return (
          <div className='status-card'>
            <div className='status-card-transfer'>
              <div className='status-card-transfer-heading'>
                Incoming Land ID - {elements._LandId}
              </div>
              <div className='status-card-transfer-body'>
                <div className='status-card-transfer-details'>
                  <div>
                    From - {elements._ProfileName}
                  </div>
                  <div>
                    Wallet Address - {elements._WalletAddress}
                  </div>
                </div>
                <div className='status-card-transfer-button'>
                  <button className='landactions-navbar-buttons' onClick={()=>{Approve(elements._LandId , elements._WalletAddress , elements._ProfileName)}}>Approve</button>
                </div>
              </div>
            </div>
          </div>
    )

  })

     
  

  if(isLogin){
    return (
      <>
      <div className='display-cards'>
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
