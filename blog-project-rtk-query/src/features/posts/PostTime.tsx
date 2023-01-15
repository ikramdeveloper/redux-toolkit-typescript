import { formatDistanceToNow } from "date-fns";

interface IPostTime {
  date: Date;
}

const PostTime = ({ date }: IPostTime) => {
  return (
    <span title={new Date(date).toISOString()}>
      &nbsp; <i>{formatDistanceToNow(new Date(date), { addSuffix: true })}</i>
    </span>
  );
};
export default PostTime;
