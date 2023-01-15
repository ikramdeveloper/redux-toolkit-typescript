import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IdType } from "../../types";
import { IUser } from "../../types/userType";
import { selectUserById } from "../users/userSlice";

interface IPostAuthor {
  userId: IdType;
}

const PostAuthor = ({ userId }: IPostAuthor) => {
  const foundUser = useSelector((state) =>
    selectUserById(state, userId)
  ) as IUser;

  return (
    <span>
      by{" "}
      {foundUser ? (
        <Link to={`/user/${userId}`}>{foundUser.name}</Link>
      ) : (
        "Unknown Author"
      )}
    </span>
  );
};
export default PostAuthor;
