import React, { useState } from 'react'
import './Sidebar.css';
import yourland from './yourland.png';
import transferland from './transferland.png'
import viewland from './viewland.png'
import  documents from './documents.png'
import { Link,Outlet } from 'react-router-dom';


export default function SideBar() {
    const [sm1 ,setsm1] = useState('')
    const [sm2 ,setsm2] = useState('')
    const [sm3 ,setsm3] = useState('')
    const [sm4 ,setsm4] = useState('')



    const setPermanentClass = (setter , className)=>{
        setsm1('')
        setsm2('')
        setsm3('')
        setsm4('')
        setter(className)
      }

    const setClass = (classname , setter , classs)=>{
        if(classname != ''){
        }
        else{
         setter(classs)
        }
    }
  return (
    <div>
    <div className='sidebar'>

        <div className='sidebar-sec'>
            <div className='sidebar-sec-heading'>
                Land Actions
            </div>

            <Link to='/Land/YourLand/myNft' style={{ textDecoration: 'none' }}>
            <div className='side-navigators' onPointerEnter={()=>{setClass(sm1 , setsm1 , '')}} onClick={()=>{setPermanentClass(setsm1 , 'side-mark')}}>
                    <div className='side-heading'>
                        <img className='side-logo' src={yourland}>
                        </img>
                        <div className='side-heading-title'>
                        Your Land
                        </div>
                    </div>
                <div className={sm1}></div>
            </div>
            </Link>

            <Link to='/Land/Transfer/TransferLand' style={{ textDecoration: 'none' }}>
            <div className='side-navigators' onPointerEnter={()=>{setClass(sm2 , setsm2 , '')}} onClick={()=>{setPermanentClass(setsm2 , 'side-mark')}}>
                    <div className='side-heading'>
                        <img className='side-logo' src={transferland}>
                        </img>
                        <div className='side-heading-title'>
                        Transfer Land
                        </div>
                    </div>
                <div className={sm2}></div>
            </div>
            </Link>

            <Link to='/Land/ViewLand' style={{ textDecoration: 'none' }}>
            <div className='side-navigators' onPointerEnter={()=>{setClass(sm3 , setsm3 , '')}} onClick={()=>{setPermanentClass(setsm3 , 'side-mark')}}>
                    <div className='side-heading'>
                        <img className='side-logo' src={viewland}>
                        </img>
                        <div className='side-heading-title'>
                        View Land
                        </div>
                    </div>
                <div className={sm3}></div>
            </div>
            </Link>
        </div>


        <div className='sidebar-sec'>
            <div className='sidebar-sec-heading'>
                Personsal
            </div>

            <Link to='/Land/' style={{ textDecoration: 'none' }}>
            <div className='side-navigators' onPointerEnter={()=>{setClass(sm4 , setsm4 , '')}} onClick={()=>{setPermanentClass(setsm4 , 'side-mark')}}>
                    <div className='side-heading'>
                        <img className='side-logo' src={documents}>
                        </img>
                        <div className='side-heading-title'>
                        Documents
                        </div>
                    </div>
                <div className={sm4}></div>
            </div>
            </Link>
        </div>
    </div>

    <div className='sidebar-outlets'>
      <Outlet/>
    </div>
        
            
    </div>
  )
}
