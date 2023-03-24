import React, { useEffect, useState } from 'react'
import { GetRequestLists, PostRequestforApproval, SignMessage } from '../../Utils'
import pending from '../pendingimg.png'
import checked from '../checkedimg.png'
import updated from '../updatedimg.png'
import wrong from '../wrongimg.png'
import { Link } from 'react-router-dom'
import login from '../../loginimg.gif'



export default function Pendingapprovals() {
    const [list , setlist] = useState([])
    const [isLogin , setisLogin] = useState(true)




  
    useEffect(()=>{
      GetRequestLists('/ApprovepreNfts' , setlist , setisLogin)

    },[])

    const Approve = async (landid)=>{
      const signature = await SignMessage()
      if(signature){
            PostRequestforApproval('/ApprovedNft' , {
              _Signature : signature,
              _LandId : landid
            } , GetRequestLists, "/ApprovepreNfts", setlist, setisLogin)
          }
    }

  const reviewLands = list.map((elements , index)=>{
    if(elements._isNftCreated === true){

    }
    else{
      


    let s1 = 'hide'
    let s3 = 'hide'
    let s4 = 'hide'
    let s5 = 'hide'
    let s6 = 'hide'
    let sa1 = 'hide'
    let sa2 = 'hide'
    let sa3 = 'hide'
    let sa4 = 'hide'


    if(elements._isReviewedbyAuthority === true){
      s3 = checked
      if(elements._isupdatedArea === true){
        s1 = updated
      }
      else if(elements._isupdatedArea === null){
        s1 = checked
      }
      else{
        s1 = wrong
      }
  
      if(elements._isupdatedType === true){
        s5 = updated
      }
      else if(elements._isupdatedType === null){
        s5 = checked
      }
      else{
        s5 = wrong
      }
  
      if(elements._isupdatedAddress === true){
        s6 = updated
      }
      else if(elements._isupdatedAddress === null){
        s6 = checked
      }
      else{
        s6 = wrong
      }

      if(elements._isRestricted === true){
        s4 = wrong
      }
      else{
        s4 = checked
      }
      if(elements._ValidSignature === null){
        sa1 = 'status-approval'
      }
      else{
        sa4 = 'status-approval'
      }
    }

    else if(elements._isReviewedbyAuthority === null){
      s1 = pending
      s3 = pending
      s4 = pending
      s5 = pending
      s6 = pending
      sa2 = 'status-approval'
    }
    else{
      if(elements._isupdatedArea === true){
        s1 = updated
      }
      else if(elements._isupdatedArea === null){
        s1 = checked
      }
      else{
        s1 = wrong
      }
  
      if(elements._isupdatedType === true){
        s5 = updated
      }
      else if(elements._isupdatedType === null){
        s5 = checked
      }
      else{
        s5 = wrong
      }
  
      if(elements._isupdatedAddress === true){
        s6 = updated
      }
      else if(elements._isupdatedAddress === null){
        s6 = checked
      }
      else{
        s6 = wrong
      }
  
      if(elements._isRestricted === true){
        s4 = wrong
      }
      else{
        s4 = checked
      }
      sa3 = 'status-approval'
    }

   


    




    return(
        <>
        <div className='status-card'>
        <div className='status-land-info'>
          <div className='status-land-id'>
            Proposed Land Id - {elements._LandId}
          </div>
          <div className='status-land-details'>
            <div className='status-land-detail'>
              <img src={s1} className='status-logo'>
              </img>
              <div>
              Land Area - {elements._LandArea}
              </div>
            </div>
            <div className='status-land-detail'>
              <img src={s3} className='status-logo'>
              </img>
              <div>
              Land Latitude and Longitude - {elements._LandLatitudeandLongitute}
              </div>
            </div>
            <div className='status-land-detail'>
              <img src={s4} className='status-logo'>
              </img>
              <div>
              Land Restrictions
              </div>
            </div>
            <div className='status-land-detail'>
              <img src={s5} className='status-logo'>
              </img>
              <div>
              Land Type - {elements._LandType}
              </div>
            </div>
            <div className='status-land-detail'>
              <img src={s6} className='status-logo'>
              </img>
              <div>
              Land Address - {elements._LandAddress}
              </div>
            </div>
          </div>
        </div>


        <div className={sa1}>
          <div className='status-review-box'>
            <div>
              Review - 
            </div>
            <div>
              {elements._ReviewComments}
            </div>   
          </div>
          <div className='status-approval-button'>
            <button onClick={()=>{Approve(elements._LandId)}}>approval</button>
            <button>Query</button>
          </div> 
          </div>

        <div className={sa2}>
          <div className='status-waiting-box'>
            Waiting For Approval
          </div>
        </div>

        <div className={sa3}>
          <div className='status-review-box'>
            <div>
              Review - 
            </div>
            <div>
              {elements._ReviewComments}
            </div>   
          </div>
          <div className='status-approval-button'>
            <button>Query</button>
          </div> 
        </div>

        <div className={sa4}>
          <div className='status-waiting-box'>
            Approved
          </div>
        </div>


        
      </div></>
    )
  
    }
  })

  if(isLogin){
    return (
      <>
      <div className='display-cards'>
        {reviewLands}
      </div>
      </>
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
      // <div className='display-cards'>
      //   <div className='status-card'>
      //     <div className='status-land-info'>
      //       <div className='status-land-id'>
      //         Proposed Land Id - 1234
      //       </div>
      //       <div className='status-land-details'>
      //         <div className='status-land-detail'>
      //           <img src={checked} className='status-logo'>
      //           </img>
      //           <div>
      //           Land Area - 1234 sq.ft
      //           </div>
      //         </div>
      //         <div className='status-land-detail'>
      //           <img src={checked} className='status-logo'>
      //           </img>
      //           <div>
      //           Land State - Maharastra
      //           </div>
      //         </div>
      //         <div className='status-land-detail'>
      //           <img src={checked} className='status-logo'>
      //           </img>
      //           <div>
      //           Land Type - Agriculture
      //           </div>
      //         </div>
      //         <div className='status-land-detail'>
      //           <img src={checked} className='status-logo'>
      //           </img>
      //           <div>
      //           Land Restrictions - none
      //           </div>
      //         </div>
      //         <div className='status-land-detail'>
      //           <img src={wrong} className='status-logo'>
      //           </img>
      //           <div>
      //           Land Type - Agriculture
      //           </div>
      //         </div>
      //         <div className='status-land-detail'>
      //           <img src={updated} className='status-logo'>
      //           </img>
      //           <div>
      //           Land Address - aster Cooperative society wahgoli , pune 412207 , maharastra
      //           </div>
      //         </div>
      //       </div>
      //     </div>
  
  
      //     <div className='status-approval'>
      //       <div className='status-review-box'>
      //         <div>
      //           Review - 
      //         </div>
      //         <div>
  
      //         </div>   
      //       </div>
      //       <div className='status-approval-button'>
      //         <button>approval</button>
      //         <button>Query</button>
      //       </div> 
      //     </div>
  
  
          
      //   </div>
      //   <div className='status-card'>
  
      //   </div>
      //   <div className='status-card'>
  
      //   </div>
      //   <div className='status-card'>
  
      //   </div>
      // </div>
    )
  }
  
}
