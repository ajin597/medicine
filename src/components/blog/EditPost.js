import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import {useSelector} from "react-redux"

function EditPost() {
    const {postId} = useParams();
    const [name, setname] = useState('');
    const [company, setcompany] = useState('');
    const [expiry_date, setexpiry_date] = useState('');
    let navigate = useNavigate();
    const user = useSelector(store => store.auth.user);
    useEffect(()=>{
        const option = {
            headers: { 'Authorization': "Bearer " + user.token }
        };
        axios.get(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, option).then(response=>{
            setname(response.data.name);
            setcompany(response.data.company);
            setexpiry_date(response.data.expiry_date)
        })
    },[postId]);
    function updatePost(){
        const option = {
            headers: { 'Authorization': "Bearer " + user.token }
        };
        axios.post(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
            name: name,
            company: company,
            expiry_date:expiry_date
        }, option).then(response=>{
            alert(response.data.message);
            navigate('/blog');
        }).catch(error => {
            console.error("Error updating post:", error);
            
        });
    }
    
    return <div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center">Edit Post</h1>
                    <div className="form-group">
                        <label>name:</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={(event)=>{setname(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Company:</label>
                        <textarea 
                        className="form-control" 
                        value={company} 
                        onChange={(event)=>{setcompany(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>expiry_date:</label>
                        <textarea 
                        className="form-control" 
                        value={expiry_date} 
                        onChange={(event)=>{setexpiry_date(event.target.value)}}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={updatePost}>Submit</button>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
}

export default EditPost;