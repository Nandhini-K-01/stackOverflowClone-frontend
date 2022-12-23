import { Avatar} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import "./css/AllQuestions.css";
import ReactHtmlParser from "react-html-parser";

function AllQuestions({question}){
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }

    const tags = JSON.parse(question.tags);
    return(
        <div className="all-questions">
            <div className="all-questions-container">
                <div className="all-questions-left">
                    <div className="all-options">
                        <div className="all-option">
                            <p>0</p>
                            <span>Votes</span>
                        </div>
                        <div className="all-option">
                            <p>{question.answerDetails.length}</p>
                            <span>Answers</span>
                        </div>
                        <div className="all-option">
                            <span>0 Views</span>
                        </div>
                    </div>
                </div>
                <div className="question-answer">
                    <Link to={`/view-question?q=${question._id}`}>{question.title}</Link>
                    <div style={{
                        width:"90%"
                    }}>
                    <div>{ReactHtmlParser(truncate(question.body,200))}</div>
                    </div>
                    <div style={{display:"flex"}}>
                    {
                        tags.map((tag)=>(<>
                        <span className="question-tags">{tag}</span>
                        </>))
                    }
                    </div>
                    <div className="author">
                        <small style={{marginLeft:"20px"}}>{new Date(question.created_at).toLocaleString()}</small>
                        <div className="author-details">
                            <Avatar/>
                            <p>{question.user? question.user : "anonymous user"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllQuestions;