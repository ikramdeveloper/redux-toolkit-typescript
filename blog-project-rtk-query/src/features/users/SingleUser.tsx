import { useSelector } from "react-redux";
import { selectUserById } from "./userSlice";
import { useGetPostsByUserIdQuery } from "../posts/postSlice";
import { Link, useParams } from "react-router-dom";
import { IUser } from "../../types/userType";

const SingleUser = () => {
  const { userId } = useParams();
  const user = useSelector((state) =>
    selectUserById(state, Number(userId))
  ) as IUser;

  if (!userId) {
    return <p>No user exists with the {userId} id</p>;
  }

  const { data, isLoading } = useGetPostsByUserIdQuery({
    userId: Number(userId),
  });

  console.log("data", data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { ids, entities } = data;

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>
        {ids.map((id: number) => (
          <li key={id}>
            <Link to={`/post/${id}`}>{entities[id].title}</Link>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default SingleUser;
