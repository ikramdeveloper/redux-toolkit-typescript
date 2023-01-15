import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IUser } from "../../types/userType";
import { selectAllUsers } from "../users/userSlice";
import { useAddPostMutation } from "./postSlice";

const PostForm = () => {
  const initialPost = {
    title: "",
    body: "",
    userId: "",
  };
  const [newPost, setNewPost] = useState(initialPost);
  const [canSave, setCanSave] = useState(false);
  const users = useSelector(selectAllUsers) as IUser[];
  const [addPost] = useAddPostMutation();

  useEffect(() => {
    setCanSave(Object.values(newPost).every((item) => item));
  }, [newPost]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (Object.values(newPost).some((item) => !item)) return;
    const { title, body, userId } = newPost;
    addPost({ title, body, userId });
    setNewPost(initialPost);
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Post Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          value={newPost.title}
          onChange={handleChange}
        />
        <label htmlFor="author">Author: </label>
        <select
          name="userId"
          id="author"
          value={newPost.userId}
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
          value={newPost.body}
          onChange={handleChange}
        />
        <button type="submit" disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};
export default PostForm;
