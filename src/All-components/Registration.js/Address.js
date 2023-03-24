import axios from 'axios';
import { ethers, utils } from 'ethers';
import React, { useEffect, useState } from 'react'

export default function Address() {
    const [profilen,setprofilen] = useState();
    const [profilep,setprofilep] = useState();
    const [Wallet , setWallet] = useState();
    const [classotp,setclassotp] = useState('ru-OTP-before');
    const [finalcon, setfinalcon] = useState('hide')
    const [resBack , setresBack] = useState();
    const [Name,setname] = useState();
    const [email, setemail] = useState();
    const [phone, setphone] = useState();
    const [confirmp, setconfirmp] = useState();
    const [validotpe, setvalidotpe] = useState();
    const [otpe, setotpe] = useState();


    // useEffect(()=>{
    //     const main = async ()=>{
    //     };
    //     main();
    // });
  //   const generateOTP = () =>{
  //     const number = Math.floor(Math.random()*1000000);
  //     setvalidotpe(number);
  //     return number;
  //   }
  //   const viewOTPsec =(e)=>{
  //     if(e === 'OK'){
  //       setclassotp('ru-OTP-sec');
  //     }
  //     else{
  //       window.alert('Something went wrong , TRY again.')
  //     }
  //   }
  
  
  //   const sendemail = async () => {
  //     if(profilep === confirmp){
  //       const OTPnumber = generateOTP();
  //       window.Email.send({
  //         Host : "smtp.elasticemail.com",
  //         Username : "na21b004@smail.iitm.ac.in",
  //         Password : "180E355A23A76CCA8B7294E08BBC199D6FCF",
  //         To : email,
  //         From : "na21b004@smail.iitm.ac.in",
  //         Subject : "Wallet Address Registration" ,
  //         Body : "your otp is" +" "+ OTPnumber,
  //     }).then(
  //       (e)=>{viewOTPsec(e)}
  //     );
  // }
  //       else{
  //         window.alert('entered something wrong')
  //       }
  //   };
    
  
    // const submitdiv = async () =>{
    //   if(+otpe === +validotpe){
    //     const array = {WalletAddress : Wallet};
    //     const res = await axios.post('/RegisterWallet', array);
    //     const confirm = await res.data;
    //     console.log(confirm);
    //     if(confirm === 'loginError'){
    //       alert('please login and try again')
    //     }
    //     else{
    //       setresBack(confirm)
    //     }
    // }
    //   else{
    //     window.alert('wrong otp, Try Again')
    //   }
    // }

    const SignMessage = async ()=>{
      if(window.ethereum){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        try{
          const res = await provider.send("eth_requestAccounts", []);
          console.log(res);
          const signer = provider.getSigner();
          const message = 'Signature';
          const messageHash =  ethers.utils.hashMessage(message)
          const signedMessage = await signer.signMessage(ethers.utils.arrayify(messageHash));
          console.log(signedMessage)
          return signedMessage
        }
        catch(e){
          alert(e.message)
          return null
        }
        
      }
      else{
        alert('install metamask')
      }
    }

    const submitwithoutotp = async ()=>{
      const signature = await SignMessage()
      if(signature){
        const array = {WalletAddress : Wallet , ProfileName : profilen , ProfilePassword : profilep , Signature : signature};
        const res = await axios.post('/RegisterWallet', array);
        const confirm = await res.data;
        console.log(confirm);
        if(confirm === 'loginError'){
          alert('please login and try again')
        }
        else{
          setresBack(confirm)
        }
        setfinalcon('hide')
      }
      else{
      }
    }


    if(resBack==='Success'){
      return(
        <>
        <div className='desktop-navgap'></div>
  
        <div className='phone-userreg-headinggap'>
  
        </div>
        <div className='MAL-main'>
          <div className='MAL-heading'>
          Register Wallet Address
          </div>
          <h2 className='ru-confirm'>
            Wallet Address successfully Registered
          </h2>
        </div>
        </>
      )
    }
    else{
      return(
        <>
        <div className={finalcon}>
          <div className='MAL-finalconfirm'>
            <div>
              Do you really want to register? 
            </div>
            <div>
            Wallet Address - 
            </div>
            <div>
            "{Wallet}"
            </div>
            <div className='MAL-confirm-reject'>
              <button onClick={submitwithoutotp}>Confirm</button>
              <button onClick={()=>{setfinalcon('hide')}}>Reject</button>
            </div>
          </div>
        </div>
        <div className='desktop-navgap'></div>
        <div className='MAL-main'>
          <div className='MAL-heading'>
            Register Wallet Address
          </div>
          <div className='MAL-title'>Profile Information</div>
          <div className='MAL-general'>
            <div className='MAL-general-div'>
              <div>Profile Name</div>
              <input type='text' onChange={(e)=>{setprofilen(e.target.value)}}></input>
            </div>
            <div className='MAL-general-div'>
              <div>Profile Passward</div>
              <input type='text' onChange={(e)=>{setprofilep(e.target.value)}}></input>
            </div>
          </div>
          <div className='MAL-Focus'>
            <div>
              Register Wallet - 
            </div>
            <input type='text' onChange={(e)=>{setWallet(e.target.value)}}></input>
          </div>
          <div className='MAL-note'>
            *note - This wallet will be registered as your official Address for Mapping land-nfts. once you submit your wallet Address you will only be able to buy ans sell your land using this address. For further quaries Contact nearest SRO office 
          </div>
          <div className='MAL-submit'>
            <button onClick={()=>{setfinalcon('MAL-finalconfirm-main')}}>Submit</button>
          </div>
        </div>
        <button onClick={SignMessage}></button>
        {/* <div className={classotp}>
            <div>
              <div>
                <div>
                  OTP
                </div>
                <input type='text' onChange={(e)=> {setotpe(e.target.value)}}>
                </input>
              </div>
              <p>
                *OTP was send through E-mail.
              </p>
              <div className='MAL-submit'>
                <button onClick={submitdiv}>Submit</button>
              </div>
            </div>
        </div> */}
        </>
      )
    }
    
}
