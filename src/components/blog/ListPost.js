import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import PostListItem from "./PostListItem";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

function ListPosts() {
  const [allPosts, setAllPosts] = useState([]); // Store all the fetched posts from the API
  const [filteredPosts, setFilteredPosts] = useState([]); // Store the filtered posts based on search term
  const [searchTerm, setSearchTerm] = useState("");

  const user = useSelector(store => store.auth.user);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(allPosts);
    } else {
      const filteredItems = allPosts.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filteredItems);
    }
  };

  const fetchPosts = () => {
    if (!user || !user.token) {
      return;
    }
    const options = {
      headers: { 'Authorization': "Bearer " + user.token }
    };

    axios.get('https://medicalstore.mashupstack.com/api/medicine', options)
      .then(response => {
        setAllPosts(response.data);
        setFilteredPosts(response.data);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [user]); // Add user as a dependency to run effect when user changes

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 mb-2">
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
              <label>Search medicine: </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  placeholder="Search medicine"
                />
                <button
                  className="btn btn-success"
                  type="submit"
                >
                  <FontAwesomeIcon icon={faSearch} /> Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="my-4">Medical Store</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            <Link to="/blog/posts/create" className="btn btn-info mb-2">
              <FontAwesomeIcon icon={faPlus} /> Add Medicine
            </Link>
            {filteredPosts.length === 0 ? (
              <p>No matching posts found.</p>
            ) : (
              filteredPosts.map((post) => (
                <PostListItem key={post.id} post={post} refresh={fetchPosts} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPosts;
