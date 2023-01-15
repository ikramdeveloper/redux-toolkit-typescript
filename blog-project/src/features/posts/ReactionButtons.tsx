import { useDispatch } from "react-redux";
import { IPost, ReactionType } from "../../types/postType";
import { addReaction } from "./postSlice";

interface IReactionButtons {
  post: IPost;
}

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ post }: IReactionButtons) => {
  const dispatch = useDispatch();

  const handleAddReaction = (reaction: ReactionType) => {
    dispatch(addReaction({ postId: post.id, reaction }));
  };

  return (
    <div>
      {Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
          key={name}
          type="button"
          className="reactionButton"
          onClick={() => handleAddReaction(name as ReactionType)}
        >
          {emoji} {post.reactions[name as ReactionType]}
        </button>
      ))}
    </div>
  );
};
export default ReactionButtons;
