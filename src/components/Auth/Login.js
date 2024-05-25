import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import Navbar from "../Navbar";
import {useNavigate} from "react-router-dom";
import "./Login.css"; // Import CSS file


function Login() {
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function attemptLogin() {
        axios.post('https://medicalstore.mashupstack.com/api/login',{
            email:email,
            password:password
        }).then(response=>{
            setErrorMessage('')
            var user = {
                email:email,
                token:response.data.token
            }
            dispatch(setUser(user));
    navigate("/blog");
        }).catch(error=>{
            if(error.response.data.errors)
                setErrorMessage(Object.values(error.response.data.errors).join(''))
            else{
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }
    return (<div>
        <Navbar/>
        <div className="container"id="aj">
            <div className="box">
            <div className="row">
                <div className="col-8 offset-2" id="header">
                    <h1>Login</h1>
                    {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                    <div className="form-group"id="input-box">
                        <label>Email:</label>
                        <input type="text"
                        className="form-control" id="email"
                        value={email}
                        onInput={(event)=>setEmail(event.target.value)}
                        />
                        <i className="bx bx-envelop"></i>
                    </div>
                    <div className="form-group"id="input-box">
                        <label>Password:</label>
                        <input type="password"
                        className="form-control"id="pass"
                        value={password}
                        onInput={(event)=>setPassword(event.target.value)}
                        />
                        <i className="bx bx-lock"></i>
                    </div>
                    <div className="form-group"id="input-box">
                        <button className="btn btn-primary float-right" id="submit" onClick={attemptLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="wrapper"></div>
        </div>
    </div>
    
    )
}

export default Login;