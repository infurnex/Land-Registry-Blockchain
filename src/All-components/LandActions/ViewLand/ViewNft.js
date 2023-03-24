import axios from 'axios'
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../LandActions.css'
import LandNFT from '../NFT/LandNFT'
import img from './dummy2.png'

export default function ViewNft() {
  const [data , setdata] = useState({})
  const [id , setid] = useState()
  const [nftclass , setnftclass] = useState('hide')

  const Submit = () =>{
    axios.post('/searchNft' , {_LandId : id}).then((e)=>{
      setdata(e.data)
      console.log(data)
      setnftclass('display-cards')
    }).catch((e)=>{alert('SomeThing went wrong try again later')})
  }
  if(data._LandId === undefined){
    return(<>
    <div className='main-space'>
        <div className='landactions-navbar'>
          <div>
            <div className='landactions-navbar-heading'>
              View Land NFT
            </div>
          </div>
  
          <div className='landactions-navbar-buttondiv' style={{width : '25%' , display : 'flex' , alignItems : 'center'}}>
            <input className='view-land-search' onChange={(e)=>{setid(e.target.value)}}></input>
            <button className='landactions-navbar-buttons' onClick={Submit}> Search </button>
          </div>
            
        </div>
        <div className='seperation-line'></div>
        <div className='main-space-sub'>
        <div className='display-cards'>
          <div className='no-nft'>
            Search Nft
          </div>
        </div>
        </div>  
      </div>
    </>)
  }
  else{


  return (
      <div className='main-space'>
        <div className='landactions-navbar'>
          <div>
            <div className='landactions-navbar-heading'>
              View Land NFT
            </div>
          </div>
  
          <div className='landactions-navbar-buttondiv' style={{width : '25%' , display : 'flex' , alignItems : 'center'}}>
            <input className='view-land-search' onChange={(e)=>{setid(e.target.value)}}></input>
            <button className='landactions-navbar-buttons' onClick={Submit}> Search </button>
          </div>
            
        </div>
        <div className='seperation-line'></div>
        <div className='main-space-sub'>
          <div className='display-cards'>
          <LandNFT img={img} landid={data._LandId} landtype={data.nft[5]} owner={data.nft[0]} address={data.nft[2]}/>
          </div>
        </div>  
      </div>
    )
  }
}
