import React, { useEffect, useState } from 'react'
import { GetRequestLists } from '../../Utils'
import login from '../../loginimg.gif'
import { Link } from 'react-router-dom'


export default function PendingTransfer() {
    const [list , setlist] = useState([])
    const [isLogin , setisLogin] = useState(true)

    useEffect(()=>{
        GetRequestLists('/getTransferData' , setlist , setisLogin)
    },[])

    const reviewLands = list.map((elements , index)=>{
        if(elements._isTransfer){
            let ta = 'hide'
            let ta1 = 'hide'
            if(elements._TransferValid === true){
                ta1 = 'status-card-transfer-button'
            }
            else{
                ta = 'status-card-transfer-button'
            }
            return(
          <div className='status-card'>
          <div className='status-card-transfer'>
            <div className='status-card-transfer-heading'>
              Incoming Land ID - {elements._LandId}
            </div>
            <div className='status-card-transfer-body'>
              <div className='status-card-transfer-details' style={{width : '70%'}}>
                <div>
                  Transfie - {elements._TransferProfileName}
                </div>
                <div>
                  Wallet Address - {elements._TransferTo}
                </div>
              </div>
              <div className={ta} style={{width : '30%'}}>
                Waiting for transfie Signature
              </div>
              <div className={ta1} style={{width : '30%'}}>
                Approved by the Transfie
              </div>

            </div>
          </div>
        
        </div> 
            )
        }
        else{
            return
            <></>
        }
         
    })


    if(isLogin){
        return (
          <div className='display-cards'>
            {reviewLands}
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
