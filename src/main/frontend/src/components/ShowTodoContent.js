import { Button } from "@chakra-ui/button";
import { EditIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { deleteTodo } from "../models/todos";
const ShowTodoContent = ({ todo, refreshTodos, toggleEdit }) => {
  const deleteBtnClicked = async () => {
    try {
      await deleteTodo(todo.id);
      refreshTodos();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div> {todo.content}</div>
      <Button
        leftIcon={<EditIcon />}
        onClick={toggleEdit}
        colorScheme="teal"
        size="xs"
      >
        Edit
      </Button>
      <Button
        leftIcon={<SmallCloseIcon />}
        onClick={deleteBtnClicked}
        colorScheme="red"
        size="xs"
      >
        Delete
      </Button>
    </>
  );
};
export default ShowTodoContent;
