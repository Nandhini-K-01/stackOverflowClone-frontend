import axios from "axios";
import React,{useState} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import {TagsInput} from 'react-tag-input-component'
import "./Question.css";
import jwt from "jsonwebtoken";

function Question(){
    const[loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const handleQuill = (value) => {
        setBody(value);
    };

    const handleSubmit = async (e) => {
        console.log(e)
        e.preventDefault();
        setLoading(true);
        const decodedtoken = jwt.decode(localStorage.getItem("token"))
        if(decodedtoken.exp * 1000 < Date.now()){
        navigate("/")
        }if(title === "" || body==="" || tags === ""){
            alert("Required fields are missing")
            setTimeout(()=>{
                window.location.reload()
              },1000)
        }else{
            const res = await axios.post("https://stackoverflowclone.onrender.com/question/create",{
                    title: title,
                    body: body,
                    tags: JSON.stringify(tags),
                    created_at: Date.now(),
                    user: decodedtoken.Username,
                    answerDetails:[],
                    comment:[]
            },{
                headers:{ accesstoken: localStorage.getItem("token"),
            },
        }
              ).then((res)=>{
                setLoading(false);
                alert("Question has been created sucessfully");
                navigate("/questions")
            }).catch((err)=>{
                setLoading(false);
                console.log(err);
            })
        }
    }

    return(
        <div className="add-question">
           <div className="add-question-container">
                <div className="head-title">
                    <h1>Ask a public question</h1>
                </div>
                <div className="question-container">
                    <div className="question-options">
                        <div className="question-option">
                           <div className="title">
                                <h3>Title</h3>
                                <small>
                                    Be specific and imagine you are asking a question to another person
                                </small>
                                <input type="text" value={title}
                                onChange={(e) => setTitle(e.target.value)} 
                                placeholder="Add question title"></input>
                            </div>
                        </div>
                        <div className="question-option">
                           <div className="title">
                                <h3>Body</h3>
                                <small>
                                    Include all the information someone would need to answer your question
                                </small>
                                <ReactQuill value={body} onChange={handleQuill} className="react-quill" theme="snow"/>
                            </div>
                        </div>
                        <div className="question-option">
                           <div className="title">
                                <h3>Tags</h3>
                                <small>
                                    Add upto 5 tags to describe what your questionis about
                                </small>
                                <TagsInput name="tags" value={tags} onChange={setTags}  placeholder="press enter to add new tag"/>
                            </div>
                        </div>       
                    </div>
                </div>
                <button type="submit" onClick={handleSubmit} className="button" disabled={loading}>
                    {loading? "Adding question..." : "Add your question"}</button>
           </div>
        </div>
    )
}

export default Question;