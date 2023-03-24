import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function YourlandNav() {
  return (
    <div>
      <div className='YL-CS'>
        <Link to='/Market/nfts' style={{ textDecoration: 'none' }}>
            <button className='YL-CS-div'>
                My Land NFTs
            </button>
        </Link>
        <Link to='/Market/YourLand/Create' style={{ textDecoration: 'none' }}>
            <button className='YL-CS-div'>
                Creating Approvals
            </button>
        </Link>
      </div>
      <div className='MD-items'>
        <Outlet/>
      </div>
    </div>
  )
}
