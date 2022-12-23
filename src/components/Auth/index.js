import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

function Index(){
    const[register, setRegister] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError("");
        setLoading(true);
        if (email === "" || password === "" || username === "") {
          setError("Required field is missing.");
          setLoading(false);
        // } else (!validateEmail(email))
        //   setError("Email is malformed");
        //   setLoading(false);
      }
      try{
        var response = await axios.post('https://stackoverflowclone.onrender.com/register/signup', {
            Username: username,
            email: email,
            password: password
        })
        console.log(response)
        if(response.data) {
            setLoading(false);
            setUsername("  ");
            setEmail(" ");
            setPassword("")
            alert("Your account has been created successfully!!");
            setTimeout(()=>{
              window.location.reload()
            },1000)
        }
    }catch(err) {
        console.log(err)
    }
  };

        const handleSignIn = async (e) => {
        e.preventDefault();
        setError();
        setLoading(true);
        if (email === "" || password === "") {
          setError("Required field is missing");
          setLoading(false);
        // } else (!validateEmail(email))
        //   setError("Email is malformed");
        //   setLoading(false);
        }
        try{
          var response = await axios.post('https://stackoverflowclone.onrender.com/register/signin', {
              email: email,
              password: password
          })
          if(response.data) {
              await localStorage.setItem("token", response.data)
              navigate('/questions');
          }
      }catch(err) {
          console.log(err)
      }
      }

    return (
        <div className="auth">
            <div className="auth-container">
                <p>Log in using any one of the following services</p>
                <div className="sign-options">
                    <div className="single-option">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png" alt="google"/>
                        <p>Login with Google</p>
                    </div>
                    <div className="single-option">
                        <img src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" alt="github"/>
                        <p>Login with GitHub</p>
                    </div>
                    <div className="single-option">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0tbWDOV1GMSZDtBFEiAKjxTWpbJicWWZTzA&usqp=CAU" alt="facebook"/>
                        <p>Login with Facebook</p>
                    </div>
                </div>
                <div className="auth-login">
                    <div className="auth-login-container">
                        {register?(
                        <>
                          <div className="input-field">
                            <p>Username</p>
                            <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text"/>
                          </div>
                          <div className="input-field">
                            <p>Email</p>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text"/>
                          </div>
                          <div className="input-field">
                            <p>Password</p>
                            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password"/>
                          </div>
                          <button style={{marginTop:"10px"}} onClick={handleRegister} disabled={loading}>{loading? "Registering" : "Register"}</button>
                        </>) : (
                        <>
                            <div className="input-field">
                            <p>Email</p>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text"/>
                            </div>
                            <div className="input-field">
                                <p>Password</p>
                                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password"/>
                            </div>
                            <button style={{marginTop:"10px"}} onClick={handleSignIn} disabled={loading}>{loading? "Signing in..." : "Log in"}</button>
                        </>
                        )}
                        <p onClick={()=>setRegister(!register)} style={{
                            marginTop: "10px",
                            textAlign: "center",
                            color: "#0095ff",
                            textDecoration:"underline",
                            cursor: "pointer"
                        }}>{register? "Login" : "Don't have an account? Register"}</p><br/>
                        You can login either by resgistering yourself or 
                        demo credentials:
                        welcome@gmail.com,
                        Welcome123
                    </div>
                </div>
                {error!=="" && (
                  <p style={{color:"red", fontSize:"14px"}}>
                    {error}
                  </p>
                )}
            </div>
        </div>
    )
}
export default Index;