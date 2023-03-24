import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LandNFT from '../NFT/LandNFT'
import login from '../../loginimg.gif'
import axios from 'axios'
import { GetRequestLists } from '../../Utils'



export default function YourLandnft() {
    const [list , setlist] = useState([])
    const [isLogin , setisLogin] = useState(true)
    const [classs , setclasss] = useState('hide')

    useEffect(()=>{
        GetRequestLists('/GetNfts' , setlist , setisLogin).then((e)=>{if(list.length === 0){setclasss('no-nft')}})
    },[])

    const nfts = list.map((elements , index)=>{
        return(
        <LandNFT img='https://ipfs.io/ipfs/QmWPwE7vUYz3zhHVESw7gqVhKJVBuYnPZjKB8hS4doxayd?filename=dummy1.png' landid={elements._LandId} landtype={elements.nft[5]} owner={elements.nft[0]} address={elements.nft[2]}/>
        )
    })

    if(isLogin){
        return (
            <div className='display-cards'>
              {/* <div className={classs}>
                You Don't Own a NFT
              </div> */}
              {nfts}
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
