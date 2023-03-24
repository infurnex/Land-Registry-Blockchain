import axios from 'axios'
import React, { useState } from 'react'

export default function ResAddress() {
    const [Add , setAdd] = useState()
    const [mark , setmark] = useState()
    const [city , setcity] = useState()
    const [state , setstate] = useState()
    const [code, setcode] = useState()
    const [resBack , setresBack] = useState();

    const submit = async () =>{
        var data = Add + ', ' + mark + ', ' + city + '-' + code + ', ' + state
        const resp = await axios.post('/RegisterAddress' , {
            Address : data
        })
        if(resp === 'loginError'){
          alert('please login and try again')
        }
        else{
          setresBack(resp)
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
        Register Residential Address
        </div>
        <h2 className='ru-confirm'>
          Residential Address successfully Registered
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
  
          <div className='MAL-title'>Residential Information</div>
  
          <div className='MAL-general'>
            <div className='MAL-general-div'>
              <div>Address</div>
              <input type='text' onChange={(e)=>{setAdd(e.target.value)}}></input>
            </div>
            <div className='MAL-general-div'>
              <div>Land mark</div>
              <input type='text' onChange={(e)=> {setmark(e.target.value)}}></input>
            </div>
            <div className='MAL-general-div'>
              <div>City</div>
              <input type='text' onChange={(e)=>{setcity(e.target.value)}}></input>
            </div>
            <div className='MAL-general-div'>
              <div>State</div>
              <input type='text' onChange={(e)=>{setstate(e.target.value)}}></input>
            </div>
            <div className='MAL-general-div'>
              <div>Pincode</div>
              <input type='text' onChange={(e)=>{setcode(e.target.value)}}></input>
            </div>
          </div>
          <div className='MAL-submit'>
            <button onClick={submit}>Submit</button>
          </div>
      </div>
      </>
    )
  }
  
}
