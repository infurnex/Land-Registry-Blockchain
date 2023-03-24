import ham from './hamburger.png';
import tri from './triange.png';
import React from 'react'
import search from './searchicon.png'


function MarketSearch(props){
    const searchedref = React.createRef();
    const searchedtaskk = [];
    function searchedland() {
    }
    function allland(){
    }
    return(
        <div className="main">
            <div className="searchbar" >
                <input className="inputtext" type='text' placeholder='Search for land address , city, state'>
                </input>
                <img className='searchbar-search' src={search}>
                </img>
            </div>
            <img className="filter-img" src={ham}>
            </img>
        </div>
    )
        
 } 
 export default MarketSearch;