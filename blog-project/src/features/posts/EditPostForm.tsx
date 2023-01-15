import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { selectPostById, editPost } from "./postSlice";
import { selectAllUsers } from "../users/userSlice";
import { StoreType } from "../../app/store";
import { IUser } from "../../types/userType";

const EditPostForm = () => {
  const { id: postId } = useParams();
  if (!postId) {
    return <p>Please use valid post Id</p>;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((state: StoreType) => selectPostById(state, postId));
  const users = useSelector((state: StoreType) => selectAllUsers(state));

  const [updatedPost, setUpdatedPost] = useState({
    title: post?.title,
    body: post?.body,
    userId: post?.userId,
  });
  const [canSave, setCanSave] = useState(false);
  useEffect(() => {
    setCanSave(Object.values(updatedPost).every((item) => item));
  }, [updatedPost]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, body, userId } = updatedPost;
    const boundActionCreators = bindActionCreators(editPost, dispatch);
    boundActionCreators({ ...post, title, body, userId });
    navigate(`/post/${postId}`);
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Post Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          value={updatedPost.title}
          onChange={handleChange}
        />
        <label htmlFor="author">Author: </label>
        <select
          name="userId"
          id="author"
          value={updatedPost.userId}
          onChange={handleChange}
        >
          <option value="" disabled></option>
          {users.map((user: IUser) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label htmlFor="body">Body: </label>
        <textarea
          name="body"
          id="body"
          value={updatedPost.body}
          onChange={handleChange}
        />
        <button type="submit" disabled={!canSave}>
          Update Post
        </button>
      </form>
    </section>
  );
};
export default EditPostForm;
