import axios from 'axios';
import React, {useState} from 'react'
import { Link } from 'react-router-dom';


export default function MainpageREG() {

  const [Oadd , setOadd] = useState()
  const [add, setadd] = useState()
  const [city,setcity] = useState()
  const [dis , setdis] = useState()
  const [state , setstate] = useState()
  const [pc, setpc] = useState()
  const [classotp,setclassotp] = useState('ru-OTP-before');
  const [resBack , setresBack] = useState();
  const [Name,setname] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [profilen,setprofilen] = useState();
  const [profilep,setprofilep] = useState();
  const [confirmp, setconfirmp] = useState();
  const [validotpe, setvalidotpe] = useState();
  const [otpe, setotpe] = useState();

  const generateOTP = () =>{
    const number = Math.floor(Math.random()*1000000);
    setvalidotpe(number);
    return number;
  }
  const viewOTPsec =(e)=>{
    if(e === 'OK'){
      setclassotp('ru-OTP-sec');
    }
    else{
      window.alert('Something went wrong , TRY again.')
    }
  }


  const sendemail = async () => {
    if(profilep === confirmp){
      const OTPnumber = generateOTP();
      window.Email.send({
        Host : "smtp.elasticemail.com",
        Username : "na21b004@smail.iitm.ac.in",
        Password : "180E355A23A76CCA8B7294E08BBC199D6FCF",
        To : email,
        From : "na21b004@smail.iitm.ac.in",
        Subject : "USER Registration" ,
        Body : "your otp is" +" "+ OTPnumber,
    }).then(
      (e)=>{viewOTPsec(e)}
    );
}
      else{
        window.alert('entered something wrong')
      }
  };
  

  const submitdiv = async () =>{
    if(+otpe === +validotpe){
      const array = {Name : Name , Email : email, Phone : phone , ProfileName : profilen , ProfilePassword : profilep};
      const res = await axios.post('/RegisterUser', array);
      const confirm = await res.data;
      console.log(confirm);
      setresBack(confirm);
  }
    else{
      window.alert('wrong otp, Try Again')
    }
  }

  if(resBack==='success'){
    return(
      <>
      <div className='desktop-navgap'></div>

      <div className='phone-userreg-headinggap'>

      </div>
      <div className='MAL-main'>
        <div className='MAL-heading'>
          Register User
        </div>
        <h2 className='ru-confirm'>
          User successfully Registered
        </h2>
      </div>
      </>
    )
  }
  else{
    return (
      <>
      <div className='desktop-navgap'></div>
      <div className='MAL-main'>
        <div className='MAL-heading'>
          Register User
        </div>
        <div className='MAL-title'>General Information</div>
        <div className='MAL-general'>
          <div className='MAL-general-div'>
            <div>Name</div>
            <input type='text' onChange={(e)=> {setname(e.target.value)}}></input>
          </div>
          <div className='MAL-general-div'>
            <div>E-mail</div>
            <input type='text' onChange={(e)=>{setemail(e.target.value)}}></input>
          </div>
          <div className='MAL-general-div'>
            <div>Phone Number</div>
            <input type='text' onChange={(e)=>{setphone(e.target.value)}}></input>
          </div>
          <div className='MAL-general-div'>
            <div>Profile Name</div>
            <input type='text' onChange={(e)=>{setprofilen(e.target.value)}}></input>
          </div>
          <div className='MAL-general-div'>
            <div>Profile Passward</div>
            <input type='text' onChange={(e)=>{setprofilep(e.target.value)}}></input>
          </div>
          <div className='MAL-general-div'>
            <div>Confirm Passward</div>
            <input type='text' onChange={(e)=>{setconfirmp(e.target.value)}}></input>
          </div>
        </div>
        <div className='MAL-submit'>
          <button onClick={sendemail}>Submit</button>
        </div>
      </div>
      <div className={classotp}>
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
      </div> 
      <div className='phone-userreg-bottomnav'>

      </div>
      </>
    )
  }
  
}