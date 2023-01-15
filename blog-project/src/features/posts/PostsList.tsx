import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectPostsIds, getPostsStatus, getPostsError } from "./postSlice";

import PostExcerpt from "./PostExcerpt";
import { IdType } from "../../types";

const PostsList = () => {
  const postsIds = useSelector(selectPostsIds);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  let content: ReactNode = "";
  if (postsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "failed") {
    content = <p>Failed: {postsError}</p>;
  } else if (postsStatus === "succeeded") {
    content = postsIds.map((postId: IdType) => (
      <PostExcerpt key={postId} postId={postId} />
    ));
  }

  return (
    <section>
      <h2>Posts</h2>
      <div>{content}</div>
    </section>
  );
};
export default PostsList;
