import React,{useState} from 'react'
import indiantiger from './ind-loin.png'
import market from './market.png'
import ownLand from './own_land.png'
import order from './order.png'
import documents from './documents.png'
import { Link } from 'react-router-dom'
import profilepic from './own_land.png'
import searchbar from './searchicon.png'
import { utils } from 'ethers'


export default function NavBar(){


    return(
        <div className='NB'>
            <div className='NB-navs'>
                <div className='NB-navs-1'>
                    <img src={indiantiger}></img>
                    <div>
                        Indian Land Registry
                    </div>
                </div>
                <div className='NB-navs-2'>
                    <div className='NB-navs-2-div'>
                        Home
                    </div>
                    <Link to = '/Market/Main' style={{ textDecoration: 'none' }}>
                    <div className='NB-navs-2-div'>
                        Market
                    </div>
                    </Link>
                    <div className='NB-navs-2-div'>
                        Contact
                    </div>
                    <div className='NB-navs-2-div'>
                        about us
                    </div>
                </div>
            </div>
            <div className='NB-LS'>
                <div className='NB-L'>
                <Link to='/Login' style={{ textDecoration: 'none' }}>
                    <div className='NB-L-R'>
                        login
                    </div>
                </Link>
                <Link to='/Registeruser' style={{ textDecoration: 'none' }}>
                    <div className='NB-L-R'>
                        Register
                    </div>
                </Link>
                <Link to='/Profile' style={{ textDecoration: 'none' }}>
                <div>
                    <img className='NB-L-profile' src={profilepic}></img>
                </div>
                </Link>
                </div>
                <div className='NB-S'>
                    <input type='text'></input>
                    <img src={searchbar}></img>
                </div>
            </div>
            

        </div>
    )
    
}


<Link to='/Land' style={{textDecoration : 'none' , color : 'white'}}>
Land
</Link>