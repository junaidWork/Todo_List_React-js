import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import PendingTask from "./pendingTask";

export default function Todolist() {
  const [task, settask] = useState("");
  const [taskList, settaskList] = useState([]);

  const handleSubmit = (e) => {
    console.log(new Date().getTime().toString());
    if (task) {
      const record = { id: new Date().getTime().toString(), task: task };
      settaskList((taskList) => {
        return [...taskList, record];
      });
      settask("");
    }
    e.preventDefault();
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 col-8">
            <Form.Label htmlFor="fname">Task Name</Form.Label>
            <Form.Control
              type="text"
              id="fname"
              name="fname"
              value={task}
              onChange={(e) => settask(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit">Add Task</Button>
        </Form>
        <PendingTask taskList={taskList} settaskList={settaskList} />
      </Container>
    </>
  );
}
