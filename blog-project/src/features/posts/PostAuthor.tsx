import { useSelector } from "react-redux";
import { IdType } from "../../types";
import { IUser } from "../../types/userType";
import { selectAllUsers } from "../users/userSlice";

interface IPostAuthor {
  userId: IdType;
}

const PostAuthor = ({ userId }: IPostAuthor) => {
  const users = useSelector(selectAllUsers);
  const foundUser = users.find(
    (user: IUser) => String(user.id) === String(userId)
  );

  return <span>by {foundUser ? foundUser.name : "Unknown Author"}</span>;
};
export default PostAuthor;
