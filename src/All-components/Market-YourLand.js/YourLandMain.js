import axios from 'axios';
import { utils } from 'ethers';
import React, {useState,useEffect, useRef}from 'react'
import { Link, Outlet } from 'react-router-dom'
import Sidebar from '../Side-bar'


export default function YourLandMain() {
  const [currentlist, updatelist] = useState([])

  const reff = useRef(false);
    useEffect(()=>{
        const mainfn = async ()=>{
            if(reff.current === false){
                const req =  await axios.get('/Myland');
                console.log(req.data);
                updatelist(req.data)
            }
            else{
            };
            
        };mainfn();reff.current = true;
    },[])

    const listt = currentlist.map((elements , index)=> { 
      return(
      <>
      <div className='MD-item' key={index}>
          <div className='MD-item-id'>
              <div>
              Land id - {parseInt(elements[0].hex , 16)}
              </div>
          </div>
          <img src={elements[10]} className='MD-item-img'></img>
          <div className='MD-item-dis'>
              <div>
                  {elements[3]}
              </div>
              <div>
                  <div>
                      district - {elements[6]}
                  </div>
                  <div>
                      subDistrict - {elements[7]}
                  </div>
              </div>
              <div>
                  State - {elements[4]}
              </div>
              <div>
                  <div>
                      View More
                  </div>
              </div>
          </div>
      </div>
      </>
  )})

  return (
    <div>
      <div className='YL-CS'>
        <Link to='/Market/Create' style={{ textDecoration: 'none' }}>
            <button className='YL-CS-div'>
                Create Land NFT
            </button>
        </Link>
        <Link to='/Market/Sell' style={{ textDecoration: 'none' }}>
            <button className='YL-CS-div'>
                Sell Land
            </button>
        </Link>
      </div>
      <div className='MD-items'>
        {listt}
      </div>
      <Outlet/>
    </div>
  )
}
