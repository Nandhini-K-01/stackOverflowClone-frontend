import { FilterList } from "@mui/icons-material";
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import AllQuestions from "./AllQuestions";
import "./css/Main.css";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import SearchIcon  from "@mui/icons-material/Search";

function Main({questions}){
    const [questionData, setQuestionData] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    // const navigate = useNavigate();
    // useEffect(()=>{
    //     async function getQuestion(){
    //         const decodedtoken = jwt.decode(localStorage.getItem("token"));
    //         if(decodedtoken.exp * 1000 < Date.now()){
    //             navigate("/")
    //             }else{
    //                 const res = await axios.get(`http://localhost:4000/question/get`,{
    //                     headers:{ accesstoken: localStorage.getItem("token"),
    //                 }
    //             }
    //                   ).then((res)=>{
    //                         const data = res.data.map(value => value.title)
    //                         // console.log(data)
    //                         setQuestionData(data)
    //                 }).catch((err)=>{
    //                     console.log(err);
    //                 })
    //             }
    //         }
    //     getQuestion()
    // },[])
    // console.log(questionData)
    return(
        <div className="main">
            <div className="main-container">
            <div className="header-search-container">
                    <SearchIcon/>
                    <input type="text" placeholder="Search..." onChange={(e)=>setSearchTitle(e.target.value)} />
                </div><br/>
                <div className="main-top">
                    <h2>All Questions</h2>
                    <Link to="/add-question">
                    <button>Ask Question</button>
                    </Link>
                </div>
                <div className="main-desc">
                    <p>{questions.length} questions</p>
                    <div className="main-filter">
                        <div className="main-tabs">
                            <div className="main-tab">
                                <Link>Newest</Link>
                            </div>
                            <div className="main-tab">
                                <Link>Active</Link>
                            </div>
                            <div className="main-tab">
                                <Link>More</Link>
                            </div>
                            </div>
                            <div className="main-filter-item">
                                <FilterList/>
                                <p>Filter</p>
                            </div>
                        </div>
                    </div>
                    <div className="questions">
                    {/* {
                        searchTitle.toLocaleLowerCase() === "" ?  (questions.map((que,index)=>(
                            <>
                                <div key={index} className="question">
                                    <AllQuestions question={que}/>
                                </div>
                            </>
                        ))) : (questionData.filter((title) => {title.toLowerCase().includes(questions.tile).map((que,index)=>(
                            <>
                                <div key={index} className="question">
                                    <AllQuestions question={que}/>
                                </div>
                            </>))}))
                    } */}
                        {questions.map((que,index)=>(
                            <>
                                <div key={index} className="question">
                                    <AllQuestions question={que} searchTitle={searchTitle}/>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
    )
}

export default Main;