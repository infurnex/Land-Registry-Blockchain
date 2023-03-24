import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../LandActions.css'

export default function Yourland() {
  return (
    <div className='main-space'>
      <div className='landactions-navbar'>
        <div>
          <div className='landactions-navbar-heading'>
            Your Land Collections
          </div>
        </div>

        <div>
          <Link to='Pendings' style={{ textDecoration: 'none' }}>
          <div className='landactions-navbar-buttons'>
          Pending approvals
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
