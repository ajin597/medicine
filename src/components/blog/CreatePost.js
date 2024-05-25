import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import {useSelector} from "react-redux"
import checkAuth from "../Auth/checkAuth";

function CreatePost() {
    const [name, setname] = useState('');
    const [company, setcompany] = useState('');
    const [expiry_date, setexpiry_date] = useState('');
    var navigate = useNavigate()
    const user = useSelector(store => store.auth.user);
    function addPost() {
        const option = {
            headers: { 'Authorization': "Bearer " + user.token }
        };
        axios.post('https://medicalstore.mashupstack.com/api/medicine',{
            name: name,
            company: company,
            expiry_date:expiry_date
        },option).then(response=>{
            navigate('/blog')
        })
    }
    return (<div>
        <Navbar></Navbar>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center">Create Post</h1>
                    <div className="form-group">
                        <label>Title:</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={(event)=>{setname(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Content:</label>
                        <textarea 
                        className="form-control" 
                        value={company} 
                        onChange={(event)=>{setcompany(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Content:</label>
                        <textarea 
                        className="form-control" 
                        value={expiry_date} 
                        onChange={(event)=>{setexpiry_date(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={addPost}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default checkAuth(CreatePost);