import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';


function PostListItem(props) {
    const user = useSelector(store => store.auth.user);

    function deletePost() {
    
        const option = {
            headers: { 'Authorization': "Bearer " + user.token }
        };
    
        axios.delete('https://medicalstore.mashupstack.com/api/medicine/' + props.post.id, option)
            .then(response => {
                alert(response.data.message);
                props.refresh();
            })
            .catch(error => {
                console.error("Error deleting post:", error);
            });
    }
    

    return (
        <div className="card">
            <div className="card-body">
                {props.post.name}
                {user && user.token && (
                    <>
                        <button className="btn btn-primary float-right" onClick={deletePost}>
    <FontAwesomeIcon icon={faTrash} /> Delete
</button>
<Link to={"/blog/posts/" + props.post.id + "/edit"} className="btn btn-primary float-right">
    <FontAwesomeIcon icon={faEdit} /> Edit
</Link>
<Link to={"/blog/posts/" + props.post.id} className="btn btn-info float-right">
    <FontAwesomeIcon icon={faEye} /> View
</Link>

                    </>
                )}
            </div>
        </div>
    );
}

export default PostListItem;
