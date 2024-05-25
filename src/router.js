import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ListPosts from "./components/blog/ListPost";
import CreatePost from "./components/blog/CreatePost";
import Register from "./components/Auth/register";
import Login from "./components/Auth/Login";
import ViewPost from "./components/blog/Viewpost";
import EditPost from "./components/blog/EditPost";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'blog', element: <ListPosts/> },
    { path : 'blog/posts/create' , element : <CreatePost/> },
    { path : 'register' , element : <Register/> },
    { path : 'Login' , element : <Login/> },
    { path: 'blog/posts/:postId', element: <ViewPost/>},
    { path : '/blog/posts/:postId/edit', element: <EditPost/>}
    

    

]);

export default router;