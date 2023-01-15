import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postSlice";
import ReactionButtons from "./ReactionButtons";
import PostTime from "./PostTime";
import PostAuthor from "./PostAuthor";
import { IdType } from "../../types";
import { StoreType } from "../../app/store";
import { IPost } from "../../types/postType";

interface IPostExcerpt {
  postId: IdType;
}

const PostExcerpt = ({ postId }: IPostExcerpt) => {
  const post = useSelector((state: StoreType) =>
    selectPostById(state, postId)
  ) as IPost;

  return (
    <article>
      <h3>{post.title}</h3>
      <p className="excerpt">{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <Link to={`/post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <PostTime date={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};
export default React.memo(PostExcerpt);
