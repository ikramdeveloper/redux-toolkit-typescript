import { formatDistanceToNow, parseISO } from "date-fns";

interface IPostTime {
  date: string;
}

const PostTime = ({ date }: IPostTime) => {
  return (
    <span title={date}>
      &nbsp; <i>{formatDistanceToNow(parseISO(date), { addSuffix: true })}</i>
    </span>
  );
};
export default PostTime;
