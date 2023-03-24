import axios from 'axios';
import { utils } from 'ethers';
import React, { useEffect, useState } from 'react'
import Sidebar from '../Side-bar'

export default function SellLand() {
    const [Landid , setLandid] = useState()
    const [result ,  setresult] = useState()
    const [otp, setotp] = useState()
    const [classotp , setclassotp] = useState('ru-OTP-before')
    const [emailresp , setemailresp] = useState()
    const [submsg , setsubmsg] = useState();
    const [add , setadd] = useState();

    useEffect(()=>{
    });

    const generateOTP = () =>{
        const number = Math.floor(Math.random()*1000000);
        setotp(number);
        return(number);
    }

    const viewOTPsec =(e)=>{
        if(e === 'OK'){
          setclassotp('ru-OTP-sec');
        }
        else{
          window.alert('Something went wrong , TRY again.')
        }
    }

    const verifySellData = async () =>{
    }

    const SubmitData = async () =>{
    }

    

    const sendemail = async(Email , OTPnumber)=>{
        window.Email.send({
            Host : "smtp.elasticemail.com",
            Username : "na21b004@smail.iitm.ac.in",
            Password : "180E355A23A76CCA8B7294E08BBC199D6FCF",
            To : Email,
            From : "na21b004@smail.iitm.ac.in",
            Subject : "Set Land for Sale" ,
            Body : "your otp is" +" "+ OTPnumber,
        }).then(
          (e)=>{alert(e); setemailresp(e);console.log(e); viewOTPsec(e)}
        );
    }

    if(submsg !== 'success'){
        return(
            <div className='MAL-Everything'>
      <div className='MAL-main'>
        <div className='MAL-heading'>
          Create Land NFT
        </div>
        <div className='MAL-title'>Selling Information</div>
        <div className='MSL-Owner'>Owner - {add}</div>
        <div className='MAL-general'>
          <div className='MAL-general-div'>
            <div>LandID</div>
            <input type='text' onChange={(e)=>{setLandid(e.target.value)}}></input>
          </div>
        </div>
        <div className='MAL-submit'>
          <button onClick={verifySellData}>Submit</button>
        </div>
      </div>
      <div className={classotp}>
          <div>
            <div>
              <div>
                OTP
              </div>
              <input type='text' onChange={(e)=> {setotp(e.target.value)}}>
              </input>
            </div>
            <p>
              *OTP was send through E-mail.
            </p>
            <button className='ru-main-div-submit' onClick={SubmitData}>
            Confirm OTP
            </button>
          </div>
       </div>
      </div>
        )
    }
    else{
        return(
            <div>
      <div className='desktop-navgap'></div>
      <div className='phone-userreg-headinggap'></div>
      <div className='MAL-sidebar'>
      <div className='MAL-main'>
        <div className='MAL-heading'>
          Create Land NFT
        </div>
        <div className='successfull-submition'>
            Successfully Uploaded Land for sale
        </div>
        </div>
        </div>
        </div>
        )
    }

}
 