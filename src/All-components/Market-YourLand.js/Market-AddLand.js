import axios from 'axios'
import { ethers, utils } from 'ethers'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import login from '../loginimg.gif'
import { GetRequestLists, PostRequestforApproval, SignMessage } from '../Utils'

export default function MarketAddLand() {
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

  const reviewNfts = list.map((elements , index)=>{
    let athorised = 'hide'
    let authoriseReject = 'hide'
    let approveclass = 'hide'
    let approvedclass = 'hide'
    if(elements._isReviewedbyAuthority){
      if(elements._ValidSignature){
        approvedclass = 'approved-nft'
      }
      else{
        approveclass = 'MAL-confirm-reject'
      }
    }
    else if(elements._isReviewedbyAuthority === null){
      athorised = 'review-nft'
    }
    else{
      authoriseReject = 'review-nft'
    }
    return(
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
          <div className={approveclass} style={{width : '200px'}}>
            <button onClick={()=>{Approve(elements._LandId)}}>Approve</button>
          </div> 
          <div className={athorised}>
            <div>
            Reviewing Land Nft....
            </div>
          </div>
          <div className={authoriseReject}>
            <div>
            Reviewing Nft Rejected
            </div>
            <div>
              Reason - {elements._ReviewComments}
            </div>
          </div>
          <div className={approvedclass}>
            Approved
          </div>
        </div>
      </>
    )
  })
  
  if(isLogin){
    return (
      <>
      <div className='Creating-reqs'>
        {reviewNfts}
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
















  // const [Oadd , setOadd] = useState()
  // const [add, setadd] = useState()
  // const [city,setcity] = useState()
  // const [dis , setdis] = useState()
  // const [state , setstate] = useState()
  // const [pc, setpc] = useState()
  // const [aadhar , setaadhar] = useState()
  // const [sd ,setsd] = useState()
  // const [photo , setphoto] = useState()
  // const [noc , setnoc] = useState()
  // const [mb , setmb] = useState()

  // const extractfiledata = (fd , fun)=>{
  //   console.log(fd)
  //   const file = new FileReader();
  //   file.onload = (e) =>{
  //     fun(e.target.result);
  //   }
  //   file.readAsDataURL(fd);
  // }

  // const submit = async ()=>{
  //   if(add && city && dis && state && pc && aadhar && sd && photo && noc && mb){
  //     const res = await axios.post('/docforverification' , {A : add , C : city , D : dis, S : state , P : pc , AC : aadhar , S : sd , P : photo , Noc : noc , Tb: mb , O : Oadd})
  //   }
  // }\













      // <div className='MAL-Everything'>
      // <div className='MAL-main'>
      //   <div className='MAL-heading'>
      //     Create Land NFT
      //   </div>
      //   <div className='MAL-title'>General Information</div>
      //   <div className='MAL-general'>
      //     <div className='MAL-general-div'>
      //       <div>Address</div>
      //       <input type='text' onChange={(e)=>{setadd(e.target.value)}}></input>
      //     </div>
      //     <div className='MAL-general-div'>
      //       <div>city</div>
      //       <input type='text' onChange={(e)=>{setcity(e.target.value)}}></input>
      //     </div>
      //     <div className='MAL-general-div'>
      //       <div>district</div>
      //       <input type='text' onChange={(e)=>{setdis(e.target.value)}}></input>
      //     </div>
      //     <div className='MAL-general-div'>
      //       <div>state</div>
      //       <input type='text' onChange={(e)=>{setstate(e.target.value)}}></input>
      //     </div>
      //     <div className='MAL-general-div'>
      //       <div>Pin code</div>
      //       <input type='text' onChange={(e)=>{setpc(e.target.value)}}></input>
      //     </div>
      //   </div>
      //   <div className='MAL-title'>Documents</div>
      //   <div className='MAL-documents'>
      //     <div className='MAL-documents-div'>
      //       <div>Aadhar card*</div>
      //       <input type='file' onChange={(e)=>{extractfiledata(e.target.files[0] , setaadhar)}}></input>
      //     </div>
      //     <div className='MAL-documents-div'>
      //       <div>Sale Deed*</div>
      //       <input type='file' onChange={(e)=>{extractfiledata(e.target.files[0] , setsd)}}></input>
      //     </div>
      //     <div className='MAL-documents-div'>
      //       <div>Photo*</div>
      //       <input type='file' onChange={(e)=>{extractfiledata(e.target.files[0] , setphoto)}}></input>
      //     </div>
      //     <div className='MAL-documents-div'>
      //       <div>No objection certificate*</div>
      //       <input type='file' onChange={(e)=>{extractfiledata(e.target.files[0] , setnoc)}}></input>
      //     </div>
      //     <div className='MAL-documents-div'>
      //       <div>Municipal tax bill*</div>
      //       <input type='file' onChange={(e)=>{extractfiledata(e.target.files[0] , setmb)}}></input>
      //     </div>
      //   </div>
      //   <div className='MAL-submit'>
      //     <button onClick={submit}>Submit</button>
      //   </div>
      // </div>
      // <div className='MAL-helps'>
      //   <div>Need help?</div>
      //   <div>
      //     contact your nearest SRO office
      //     <span className='MAL-help-here' > here</span>
      //   </div>
      // </div>
      // </div>