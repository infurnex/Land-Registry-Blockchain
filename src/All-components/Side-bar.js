import { Link, Outlet } from 'react-router-dom'
export default function Sidebar(){
    return(
        <>
        <div className="sb-div-0">
            <Link to='/Market/YourLand' style={{ textDecoration: 'none' }}>
                <p className="sb-div-p">
                    Your Land
                </p>
            </Link>
            <p className="sb-div-p">
                Land NFT
            </p>
            <Link to='/Market/Transfer' style={{ textDecoration: 'none' }}>
                <p className="sb-div-p">
                    Transfer Nft
                </p>
            </Link>
            <Link to='/Market/Track' style={{ textDecoration: 'none' }}>
                <p className="sb-div-p">
                    Track Order
                </p> 
            </Link>
            <p className="sb-div-p">
                Documents
            </p>
        </div>
        <div className='sd-outlet'>
          <Outlet/>
        </div>
        </>
    )
}