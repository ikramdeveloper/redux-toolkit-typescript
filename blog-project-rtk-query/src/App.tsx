import PostsList from "./features/posts/PostsList";
import PostForm from "./features/posts/PostForm";
import SinglePost from "./features/posts/SinglePost";
import EditPostForm from "./features/posts/EditPostForm";
import UsersList from "./features/users/UsersList";
import SingleUser from "./features/users/SingleUser";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Routes, Route } from "react-router-dom";
import { userApiSlice } from "./features/users/userSlice";
import { postApiSlice } from "./features/posts/postSlice";
import { useEffect } from "react";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const boundFetchDataUsers = bindActionCreators(
      userApiSlice.endpoints.getUsers.initiate,
      dispatch
    );
    boundFetchDataUsers();

    const boundFetchDataPosts = bindActionCreators(
      postApiSlice.endpoints.getPosts.initiate,
      dispatch
    );
    boundFetchDataPosts();
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<PostForm />} />
          <Route path=":id" element={<SinglePost />} />
          <Route path="edit/:id" element={<EditPostForm />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<SingleUser />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
