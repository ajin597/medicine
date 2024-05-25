import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar";
import {useSelector} from "react-redux"

function ViewPost() {
    var {postId} = useParams()
    var [post,setPost] = useState({name:'',company:'',expiry_date:''})
    const user = useSelector(store => store.auth.user);
    useEffect(() => {
        if (!user || !user.token || !postId) {
            return;
        }
        const option = {
            headers: { 'Authorization': "Bearer " + user.token }
        };
        axios.get(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, option)
            .then(response => {
                setPost(response.data);
            })
    
    }, [postId, user]);
    
    return <div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">{post.name}</div>
                        <div className="card-body">{post.company}</div>
                        <div className="card-body">{post.expiry_date}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ViewPost;