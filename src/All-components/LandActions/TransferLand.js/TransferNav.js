import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../LandActions.css'

export default function TransferNav() {
  return (
    <div className='main-space'>
      <div className='landactions-navbar'>
        <div>
          <div className='landactions-navbar-heading'>
            Transfer Land NFT
          </div>
        </div>

        <div className='landactions-navbar-buttondiv'>
          <Link to='PendingTransfers' style={{ textDecoration: 'none' }}>
          <div className='landactions-navbar-buttons'>
            Pending Transfers
          </div>
          </Link>
          <Link to='IncomingTransfers' style={{ textDecoration: 'none' }}>
          <div className='landactions-navbar-buttons'>
            Incoming Transfers
          </div>
          </Link>
        </div>
          
      </div>
      <div className='seperation-line'></div>
      <div className='main-space-sub'>
        <Outlet/>
      </div>
    </div>
  )
}
