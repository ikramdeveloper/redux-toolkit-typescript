import { IPost, ReactionType } from "../../types/postType";
import { useAddReactionMutation } from "./postSlice";

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
  const [addReaction] = useAddReactionMutation();

  const handleAddReaction = (reaction: ReactionType) => {
    addReaction({
      postId: Number(post.id),
      reactions: {
        ...post.reactions,
        [reaction]: post.reactions[reaction] + 1,
      },
    });
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
