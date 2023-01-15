import { useSelector } from "react-redux";
import { selectUserById } from "./userSlice";
import { selectPostsByUserId } from "../posts/postSlice";
import { Link, useParams } from "react-router-dom";
import { StoreType } from "../../app/store";

const SingleUser = () => {
  const { userId } = useParams();
  const user = useSelector((state: StoreType) =>
    selectUserById(state, String(userId))
  );

  const postsForUser = useSelector((state: StoreType) =>
    selectPostsByUserId(state, String(userId))
  );

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>
        {postsForUser.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default SingleUser;
