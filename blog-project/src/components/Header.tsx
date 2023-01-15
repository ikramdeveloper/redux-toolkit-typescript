import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increaseCount, selectCountValue } from "../features/posts/postSlice";
import { ReactNode } from "react";

const Header = () => {
  const count = useSelector(selectCountValue);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(increaseCount());
  };
  return (
    <header className="header">
      <h1>Blog</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/user">Users</Link>
          </li>
          <li>
            <Link to="/post">Add Post</Link>
          </li>
          <button onClick={handleClick}>{count as ReactNode}</button>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
