import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../store/authSlice";
import React from 'react';
function Navbar() {
    const user = useSelector(store => store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logout() {
        if (user) {
            axios.post('https://medicalstore.mashupstack.com/api/logout', {}, {
                headers: { 'Authorization': "Bearer " + user.token }
            })
            .then(() => {
                dispatch(removeUser());
                navigate('/Login');
            })
            .catch(error => {
                console.error("Logout error:", error);
            });
        }
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark" style={{ backgroundColor: "" }}>
            <div className="navbar-brand">
                <h4 style={{ color: "#ffffff", margin: 0 }}>medical</h4>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse mr-auto" id="navbarNav" style={{ float: "left" }}>
                <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                    {user ? (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" onClick={logout}>Logout</NavLink>
                            </li>
                    <li className="nav-item">
                        <NavLink to={"/blog"} className="nav-link">
                            Blog
                        </NavLink>
                    </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <NavLink to={"/login"} className="nav-link">
                                    Login
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/register"} className="nav-link">
                                    Sign up
                                </NavLink>
                            </li>
                        </>
                    )}
                  
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
