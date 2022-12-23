import {Link}  from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Bookmark, History } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import jwt from "jsonwebtoken";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

function MainQuestion(){
    const navigate = useNavigate()
    const[show, setShow] = useState(false);

    const [questionData, setQuestionData] = useState();
    const [answer,setAnswer] = useState("");
    const [comment, setComment] = useState("");

     let search = window.location.search;
     const params = new URLSearchParams(search);
     const id = params.get("q");

     const handleQuill = (value) =>{
        setAnswer(value)
     }

     useEffect(()=>{
        async function getQuestion(){
            const decodedtoken = jwt.decode(localStorage.getItem("token"));
            if(decodedtoken.exp * 1000 < Date.now()){
                navigate("/")
                }else{
                    const res = await axios.get(`https://stackoverflowclone.onrender.com/question/get/${id}`,{
                        headers:{ accesstoken: localStorage.getItem("token"),
                    }
                }
                      ).then((res)=>{
                        // console.log(res.data)
                        // console.log(res.data.title)
                        setQuestionData(res.data)
                    }).catch((err)=>{
                        console.log(err);
                    })
                }
            }
            getQuestion()
     },[id])

     const handleSubmit=async ()=>{
        // const body={
        //     question_id: id,
        //     answer: answer,
        //     user: "user"
        // }
        const decodedtoken = jwt.decode(localStorage.getItem("token"));
        if(decodedtoken.exp * 1000 < Date.now()){
            navigate("/")
        }if (answer === ""){
                alert("Answer is required")
            }else{
                await axios.put(`https://stackoverflowclone.onrender.com/question/put/${id}`,
                {
                    title: questionData.title,
                    body: questionData.body,
                    created_at: questionData.created_at,
                    user: questionData.user,
                    answerDetails: answer,
                    comment: questionData.comment,
                    tags: questionData.tags,
                },
                {
            headers:{ accesstoken: localStorage.getItem("token"),
            
     },
        } )
        .then(() => {
          alert("Answer added successfully");
          setAnswer("");
          setTimeout(()=>{
            window.location.reload()
          },1000)
        })
        .catch((err) => console.log(err));
            }
    };

if (questionData){
    return(
        <div className="main">
            <div className="main-container">
                <div className="main-top">
                    <h2 className="main-question">{questionData.title}</h2>
                    <Link to="/add-question">
                        <button>Ask Question</button>
                    </Link>
                </div>
                <div className="main-desc">
                    <div className="info">
                        <p>{new Date(questionData.created_at).toLocaleString()}</p>
                        <p>Active<span>today</span></p>
                        <p>Viewed<span>43 times</span></p>
                    </div>
                </div>
                <div className="all-questions">
                    <div className="all-questions-container">
                        <div className="all-questions-left">
                            <div className="all-options">
                                <p className="arrow">▲</p>
                                <p className="arrow">0</p>
                                <p className="arrow">▼</p>
                                <Bookmark/>
                                <History/>
                            </div>
                        </div>
                            <div className="question-answer">
                                <p>{ReactHtmlParser(questionData.body)}</p>
                                <div className="author">
                                    <small>asked {new Date(questionData.created_at).toLocaleString()}</small>
                                    <div className="auth-details">
                                        <Avatar/>
                                        <p>{questionData.user? questionData.user : "user"}</p>
                                    </div>
                                </div>
                                <div className="comments">
                                    <div className="comment">
                                        <p>This is comment-<span>User name</span>
                                        <small>Timestamp</small>
                                        </p>
                                    </div>
                                    <p onClick={()=>setShow(!show)}>Add a comment</p>
                                {show && (
                                    <div className="title">
                                        <textarea
                                            onChange = {(e)=>setComment(e.target.value)}
                                            value={(e)=>setComment(e.target.value)}
                                            type="text" placeholder="Add your comment..." rows={5} style={{
                                            margin:"5px 0px",
                                            padding: "10px",
                                            border: "1px solid rgba(0,0,0,0.2)",
                                            borderRadius: "3px",
                                            outline: "none",
                                        }}>
                                        </textarea>
                                        <button style={{maxWidth: "fit-content"}}>Add comment</button>
                                    </div>
                                )}
                            </div>
                         </div>
                     </div>
                 </div>
                     <div className="all-questions" style={{flexDirection: "column"}}>
                        <p style={{marginBottom: "20px", fontSize:"1.3rem", fontWeight:"300"}}>{questionData.answerDetails.length} Answer(s)</p>
                        {
                            questionData.answerDetails.map((_q)=>(
                            <div key={_q.id} className="all-questions-container">
                                    <div className="all-questions-left">
                                        <div className="all-options">
                                            <p className="arrow">▲</p>
                                            <p className="arrow">0</p>
                                            <p className="arrow">▼</p>
                                            <Bookmark/>
                                            <History/>
                                        </div>
                                    </div>
                        <div className="question-answer">
                                <p>{ReactHtmlParser(_q)}</p>
                                <div className="author">
                                    {/* <small>asked {new Date(_q.created_at).toLocaleString()}</small> */}
                                    <div className="auth-details">
                                        <Avatar/>
                                        <p>{questionData.user? questionData.user : "user"}</p>
                                    </div>
                                </div>
                            </div>
                       </div>
                      ))
                        }
                </div>       
                </div>
                    <div className="main-answer">
                        <h3 style={{fontSize:"22px", margin:"10px 0", fontWeight:"400"}}>Your Answer</h3>
                        <ReactQuill value={answer} onChange={handleQuill} className="react-quill" theme="snow" style={{heigh:"200px"}}/>
                    </div>
                    <button type="submit" style={{maxWidth:"fit-content", marginTop:"100px"}} onClick={handleSubmit}>Post your answer</button>            
        </div>
    )
                    }
}

export default MainQuestion;