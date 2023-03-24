
import NavBar from './All-components/Nav-Bar.js';
import { useState } from 'react';
import './All-CSS/Nav-Bar.css'
import './All-CSS/Side-bar.css'
import './All-CSS/App.css'
import './All-CSS/Market-display.css'
import './All-CSS/Marketsearch.css';
import Marketdisplay from './All-components/Market-display.js';
import './All-CSS/TrackOrder.css'
import MainpageREG from './All-components/Registration.js/Mainpage.js';
import './All-CSS/Registration/MainpageREG.css';
import Address from './All-components/Registration.js/Address.js';
import './All-CSS/Registration/Address.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MarketAddLand from './All-components/Market-YourLand.js/Market-AddLand.js';
import './All-CSS/Market-Yourland/MarketAddLand.css'
import './All-CSS/Modal.css'
import YourLandMain from './All-components/Market-YourLand.js/YourLandMain.js';
import './All-CSS/Market-Yourland/YourLandMain.css'
import SellLand from './All-components/Market-YourLand.js/SellLand.js';
import './All-CSS/Market-Yourland/SellLand.css'
import MarketMain from './All-components/MarketMain.js';
import './All-CSS/MarketMain.css'
import Sidebar from './All-components/Side-bar.js';
import MarketTrackpage from './All-components/MarketTrackpage.js';
import './All-CSS/MarketTrackpage.css'
import BuyerTO from './All-components/BuyerTO.js';
import './All-CSS/BuyerTO.css';
import MarketsearchSR from './All-components/MarketsearchSR.js';
import './All-CSS/MarketsearchSR.css'
import Login from './All-components/Login/Login.js';
import Profile from './All-components/Profile.js';
import ResAddress from './All-components/Registration.js/ResAddress.js';
import YourlandNav from './All-components/Market-YourLand.js/YourlandNav.js';
import MakeTransfer from './All-components/TransferLand/MakeTransfer.js';
import TransferNavBar from './All-components/TransferLand/TransferNavBar.js';
import PendingTransfer from './All-components/LandActions/TransferLand.js/PendingTransfer.js';
import Navbar from './All-components/NavBar/Navbar.js';
import SideBar from './All-components/SideBar/Sidebar.js';
import Yourland from './All-components/LandActions/YourLand/Yourland.js';
import Pendingapprovals from './All-components/LandActions/YourLand/Pendingapprovals.js';
import TransferNav from './All-components/LandActions/TransferLand.js/TransferNav.js';
import Transfer from './All-components/LandActions/TransferLand.js/Transfer.js';
import IncomingTransfer from './All-components/LandActions/TransferLand.js/IncomingTransfer.js';
import YourLandnft from './All-components/LandActions/YourLand/YourLandnft.js';
import ViewNft from './All-components/LandActions/ViewLand/ViewNft.js';


function App() {
  return (
    <div>  
    <BrowserRouter>
    <Navbar/>
      {/* <NavBar/> */}
      {/* <BuyerTO/> */}
      {/* <MarketsearchSR/> */}
      <Routes>
        <Route path='/Registeruser' element={<MainpageREG/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/Registeraddress' element={<ResAddress/>}/>
        <Route path='/Registerwallet' element={<Address/>}/>
        <Route path='/Login' element={<Login/>}/>


        <Route path="/Land" element={<SideBar/>}> 
          <Route path="Transfer" element={<TransferNav/>}>
            <Route path='TransferLand' element={<Transfer/>}/>  
            <Route path='IncomingTransfers' element={<IncomingTransfer/>}/>
            <Route path='PendingTransfers' element={<PendingTransfer/>}/>
          </Route>

          
          <Route path="YourLand" element={<Yourland/>}>
            <Route path='myNft' element={<YourLandnft/>}/>
            <Route path='Pendings' element={<Pendingapprovals/>}/>
          </Route>

          <Route path="ViewLand" element={<ViewNft/>}/>
          
          <Route path='Track' element={<MarketTrackpage/>}/>
        </Route>  
      </Routes>
      
    </BrowserRouter>
    </div>
  );
}

export default App;
