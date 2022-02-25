import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function EditForm({
  editName,
  taskList,
  settaskList,
  handleClose,
}) {
  const id = editName.id;
  const [Name, setName] = useState(editName.task);
  const [Address, setAddress] = useState("");
  const updatedTask = { id: id, task: Name, address: Address };

  const handleSubmitEdit = (e) => {
    let result = taskList.filter((item) => {
      return item.id !== id;
    });
    settaskList(result);

    settaskList((taskList) => {
      return [...taskList, updatedTask];
    });

    e.preventDefault();
  };
  console.log(taskList, "new");
  return (
    <>
      <Form onSubmit={handleSubmitEdit}>
        <Form.Group className="mt-2">
          <Form.Control
            type="text"
            name="task"
            placeholder="Enter Task"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Control
            type="text"
            name="task"
            placeholder="Enter Address"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          className="mt-3"
          variant="success"
          type="submit"
          onClick={handleClose}
        >
          Update Task
        </Button>
      </Form>
    </>
  );
}
