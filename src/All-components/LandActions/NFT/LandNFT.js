import React from 'react'
import checked from '../checkedimg.png'
import img from './dummy2.png'
export default function LandNFT(props) {
  return (
    <div className='Nft-box'>
        <div className='Nft-img'>
            <img src={img}></img>
        </div>
        <div className='Nft-body'>
            <div className='nft-flex'>
                <div className='Nft-body-field' style={{width : '50%'}}>
                    <span className='Nft-heading'>Land ID</span>- {props.landid}
                </div>
                <div className='Nft-body-field' style={{width : '50%'}}>
                    <span className='Nft-heading'>Land Type</span> - {props.landtype}
                </div>
            </div>
            <div className='Nft-body-field'>
                <span className='Nft-heading'>Owner</span> - {props.owner}
            </div>
            <div className='Nft-body-field' style={{height: '30%' , display : 'block'}}>
                <span className='Nft-heading'>Address</span>- {props.address}
            </div>
            <div className='nft-flex'>    
                <div className='Nft-body-field' style={{width : '50%'}}>
                    <img src={checked} style={{width : '12px'}}></img>
                    <span className='Nft-heading' style={{margin : '2.5px'}}>Land Restrictions</span>
                </div>
                <div className='Nft-body-field' style={{width : '50%'}}>
                    <img src={checked} style={{width : '12px'}}></img>
                    <span className='Nft-heading' style={{margin : '2.5px'}}>Government Restrictions</span>
                </div>
            </div>

            
        </div>
    </div>
  )
}
