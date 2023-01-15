import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { StoreType } from "../../app/store";
import { selectPostById, deletePost } from "./postSlice";
import PostAuthor from "./PostAuthor";
import PostTime from "./PostTime";
import ReactionButtons from "./ReactionButtons";

const SinglePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: postId } = useParams();
  if (!postId) {
    return <p>Please enter valid post Id</p>;
  }

  const post = useSelector((state: StoreType) => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>No post found</h2>
      </section>
    );
  }

  const handleDeletePost = () => {
    const boundActionCreators = bindActionCreators(deletePost, dispatch);
    boundActionCreators(postId);
    navigate("/");
  };

  return (
    <section>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <PostTime date={post.date} />
      </p>
      <button className="deleteButton" onClick={handleDeletePost}>
        Delete Post
      </button>
      <ReactionButtons post={post} />
    </section>
  );
};
export default SinglePost;
