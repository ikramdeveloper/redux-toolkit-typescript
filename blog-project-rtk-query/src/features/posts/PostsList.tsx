import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectPostsIds, useGetPostsQuery } from "./postSlice";

import PostExcerpt from "./PostExcerpt";
import { IdType } from "../../types";

const PostsList = () => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();
  const postsIds = useSelector(selectPostsIds);

  let content: ReactNode = "";
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{Object.values(error)[0] as ReactNode}</p>;
  } else if (isSuccess) {
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
