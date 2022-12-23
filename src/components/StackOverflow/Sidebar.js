import { Work, Public, Stars } from "@mui/icons-material";
import React from "react";
import {Link} from "react-router-dom";
import "./css/Sidebar.css"

function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebar-container">
                <div className="sidebar-options">
                    <div className="sidebar-options">
                        <Link>Home</Link>
                    </div>
                        <div className="sidebar-options">
                            <a>PUBLIC</a>
                            <div className="link">
                                <div className="link-tag">
                                    <Public/>
                                    <Link>Question</Link>
                                </div>
                                    <div className="tags">
                                        <p>Tags</p>
                                        <p>Users</p>
                                    </div>
                            </div>
                        </div>
                        <div className="sidebar-option">
                            <p>COLLECTIVES</p>
                                <div className="link-tag">
                                    <Stars/>
                                    <Link>Explore Collectives</Link>
                                </div>
                        </div>
                        <div className="sidebar-option">
                            <p>FIND A JOB</p>
                            <div className="link">
                                <div className="link-tag">
                                        <Link>Question</Link>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar-option">
                            <p>TEAMS</p>
                                <div className="link-tag">
                                    <Work/>
                                    <Link>Companies</Link>
                                </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;