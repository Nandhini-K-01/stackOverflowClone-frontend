import React from "react";
import MainQuestion from "./MainQuestion";
import Sidebar from "../StackOverflow/Sidebar";
import "../StackOverflow/css/index.css";

function index(){
    return(
        <>
        <div className="stack-index">
            <div className="stack-index-content">
                <Sidebar/>
                <MainQuestion/>
            </div>
        </div>
        </>
    )
}

export default index;