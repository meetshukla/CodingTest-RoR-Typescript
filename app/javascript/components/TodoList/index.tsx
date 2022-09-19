import React, { useEffect, useState } from "react";
import { Container, ListGroup, Form } from "react-bootstrap";
import { ResetButton } from "./uiComponent";
import axios from "axios";

type TodoItem = {
  id: number;
  title: string;
  checked: boolean;
};

type Props = {
  todoItems: TodoItem[];
};

const TodoList: React.FC<Props> = ({ todoItems }) => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const token = document.querySelector(
      "[name=csrf-token]"
    ) as HTMLMetaElement;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
  }, []);

  useEffect(() => {
    setTodoList(todoItems)
  }, [todoItems]);

  const checkBoxOnCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoItemId: number
  ): void => {
    axios.post("/todo", {
      id: todoItemId,
      checked: e.target.checked,
    }).then(response => {
      setTodoList(response.data);
      e.target.blur();
    });
  };

  const resetButtonOnClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    axios.post("/reset")
      .then(response => {
        setTodoList(response.data);
        e.target.blur();
      });
  };

  return (
    <Container>
      <h3>2022 Wish List</h3>
      <ListGroup>
        {todoList.map((todo) => (
          <ListGroup.Item key={todo.id}>
            <Form.Check
              type="checkbox"
              label={todo.title}
              checked={todo.checked}
              onChange={(e) => checkBoxOnCheck(e, todo.id)}
            />
          </ListGroup.Item>
        ))}
        <ResetButton onClick={(e) => resetButtonOnClick(e)}>Reset</ResetButton>
      </ListGroup>
    </Container>
  );
};

export default TodoList;