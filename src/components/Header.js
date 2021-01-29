import React,{useState} from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory,useLocation } from "react-router-dom";
import {useStateValue} from '../StateProvider';
function Header({searchItem}) {
    const [{cartLength}]=useStateValue();

    const history=useHistory();
    const location=useLocation();
    const handleClick=()=>{
        history.push('/checkout');
    }
    const handleSeacrch=(e)=>{
        searchItem(e.target.value);  
    }
    return (
        <div>
            <header>
                <div className="logo">
                    <h1>BookStore</h1>
                </div>
                <div className={`${location.pathname=="/"?"search": "search visibility"}`}>
                      <SearchIcon fontSize="large"/>
                      <input type="text" placeholder="Search your book" onChange={handleSeacrch}/>
                </div>
                <div className={`${location.pathname=="/"?"cart": "cart visibility"}`}>
                    <IconButton color="inherit" onClick={handleClick}>
                        <ShoppingCartIcon fontSize="large"/>
                    </IconButton>
                {cartLength>0?<span className="number-item"><strong>{cartLength}</strong></span>:''} 
                </div>
            </header>
        </div>
    )
}

export default Header
