
import MarketSearch from './Market-search.js';
import Sidebar from './Side-bar.js';
import React, {useState,useEffect, useRef}from 'react'
import axios from 'axios';
import loading from './loadingimg.gif'

export default function Marketdisplay(props) {
    const [currentlist, updatelist] = useState([]);
    const [serverStatus , setserverStatus] = useState();

    const reff = useRef(false);
      useEffect(()=>{
        //   const mainfn = async ()=>{
        //       if(reff.current === false){
        //           const req =  await axios.get('/Market');
        //           console.log(req.data);
        //           updatelist(req.data)
        //       }
        //       else{
        //       };
              
        //   };mainfn();reff.current = true;
        axios.get('/Market')
        .then((req)=>{console.log(req.data); updatelist(req.data) ; setserverStatus(200)})
        .catch((e)=>{setserverStatus(500)});
      },[])

    const listt = currentlist.map((elements , index)=> { 
        return(
        <>
        <div className='MD-item' >
            <div className='MD-item-id'>
                <div>
                Land id - {parseInt(elements[0].hex , 16)}
                </div>
            </div>
            <img className='MD-item-img'></img>
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
                    <div>
                        Contact Owner
                    </div>
                </div>
            </div>
        </div>
        </>
    )})
    if(currentlist.length !==0){
        return(
            <>
        <MarketSearch update={updatelist}/>
        <div className='MD-items'>
        {listt}
        </div>  
        <div className='phone-userreg-bottomnav'>
        </div> 
        </>
        )
    }
    else if(currentlist.length === 0 && serverStatus !== 500){
        return(
            <>
            <div>
                <MarketSearch/>
                <div className='MD-items'>
                    <img className='loadingimg' src={loading}></img>
                </div>
            </div>
            </>
        )
    }
    else if(serverStatus === 500){
        return(
            <>
            <div>
                <MarketSearch/>
                <div className='MD-items'>
                    <div className='loadingerror'>
                        Error loading data
                    </div>
                </div>
            </div>
            </>
        )
    }
}


