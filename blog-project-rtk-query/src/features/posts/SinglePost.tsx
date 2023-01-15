import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { selectPostById, useDeletePostMutation } from "./postSlice";
import PostAuthor from "./PostAuthor";
import PostTime from "./PostTime";
import ReactionButtons from "./ReactionButtons";

const SinglePost = () => {
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();
  const { id: postId } = useParams();
  if (!postId) {
    return <p>Please enter valid post Id</p>;
  }

  const post = useSelector((state) => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>No post found</h2>
      </section>
    );
  }

  const handleDeletePost = () => {
    deletePost({ id: Number(postId) });
    navigate("/");
  };

  return (
    <section>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <PostTime date={post.datetime} />
      </p>
      <button className="deleteButton" onClick={handleDeletePost}>
        Delete Post
      </button>
      <ReactionButtons post={post} />
    </section>
  );
};
export default SinglePost;
