import React, { useState, useEffect } from "react";
import "./css/Header.css";
import InboxIcon from "@mui/icons-material/Inbox";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";

function Header(){
    const navigate = useNavigate();
    return(
        <header>
            <div className="header-container">
                <div className="header-left">
                    <Link to="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/220px-Stack_Overflow_logo.svg.png"
                     alt="logo"/>
                     </Link>
                     <h3>Products</h3>
                </div>
                <div className="header-middle"></div>
                {/* <div className="header-search-container">
                    <SearchIcon/>
                    <input type="text" placeholder="Search..." onChange={(e)=>setSearchTitle(e.target.value)}/>
                </div> */}
                <div className="header-right">
                    <div className="header-right-container">
                        <Avatar style={{
                            cursor: "pointer",
                        }}
                        onClick={()=>navigate("/")}
                        />
                        <InboxIcon/>
                        <MenuIcon/>
                        </div>  
                </div>
            </div>            
        </header>
    )
}

export default Header;