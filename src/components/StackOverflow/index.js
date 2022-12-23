import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./css/index.css";
import Main from "./Main";
import Sidebar from "./Sidebar";
import jwt from "jsonwebtoken";
import axios from "axios"

function Index(){
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

      const decodedtoken = jwt.decode(localStorage.getItem("token"))
      if(decodedtoken.exp * 1000 < Date.now()){
        navigate("/")
      }
      else{
      async function getQuestion() {
        var res = await axios.get("https://stackoverflowclone.onrender.com/question/get",{
            headers: {
                accesstoken: localStorage.getItem("token"),
            }
        });
          setQuestions(res.data.reverse());
        }
      getQuestion();
    }
    }, []);

    
    return(
        <div className="stack-index">
            <div className="stack-index-content">
                <Sidebar/>
                <Main questions={questions}/>
            </div>
        </div>
    )
}

export default Index;