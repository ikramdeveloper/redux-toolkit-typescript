import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { TodoInterface } from "../../types/todo";
import {
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../../api/apiSlice";

interface ITodo {
  todo: TodoInterface;
}

const TodoExcerpt = ({ todo }: ITodo) => {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  return (
    <article>
      <div className="todo">
        <input
          type="checkbox"
          checked={todo.completed}
          id={String(todo.id)}
          onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
        />
        <label htmlFor={String(todo.id)}>{todo.todo}</label>
      </div>
      <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </article>
  );
};
export default TodoExcerpt;
