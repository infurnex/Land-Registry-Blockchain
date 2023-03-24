import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function TransferNavBar() {
  return (
    <div>
    <div className='YL-CS'>
      <Link to='/Market/Transfer/MakeTransfer' style={{ textDecoration: 'none' }}>
          <button className='YL-CS-div'>
              Transfer Nft
          </button>
      </Link>
      <Link to='/Market/Transfer/PendingTransfer' style={{ textDecoration: 'none' }}>
          <button className='YL-CS-div'>
              Pending Transfers
          </button>
      </Link>
      <Link to='/Market/Transfer/IncomingTransfers' style={{ textDecoration: 'none' }}>
          <button className='YL-CS-div'>
              Incoming Transfers
          </button>
      </Link>
    </div>
    <div className='MD-items'>
      <Outlet/>
    </div>
  </div>
  )
}
