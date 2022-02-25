import React from "react";
import EditForm from "./editForm";
import CompletedTask from "./completedTask";
import { confirmAlert } from "react-confirm-alert";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function PendingTask({ taskList, settaskList }) {
  const [completedList, setcompletedList] = useState([]);
  const [editName, seteditName] = useState([]);
  const [show, setShow] = useState(false);

  // for dialogue box
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    handleClose();
  }, []);

  // perfoming task in pending task portion

  const handleCheckbox = (e) => {
    const value = e.target.value;
    taskList.filter((item) => {
      if (item.id === value) {
        // const { id, task } = item;
        // const t = { id: id, task: task };
        setcompletedList((completedList) => {
          return [...completedList, item];
        });
      }
    });

    let result = taskList.filter((item) => {
      return item.id !== value;
    });
    settaskList(result);
    e.preventDefault();
  };

  const deleteCheckTask = (item) => {
    var result = taskList.filter((i) => {
      return i.id !== item.id;
    });
    settaskList(result);
  };

  const editCheckTask = (item) => {
    seteditName(item);
  };
  return (
    <>
      <div style={{ margin: "20px" }}>
        <h1 className="text-center">Pending Task</h1>
        {taskList.map((item) => {
          const { id, task, address } = item;
          return (
            <div key={id} style={{ margin: "10px" }}>
              <label>
                <input type="checkbox" value={id} onChange={handleCheckbox} />{" "}
                <span style={{ marginRight: "100px" }}>{task}</span>{" "}
                <span style={{ marginRight: "100px" }}>{address}</span>{" "}
                <span>
                  <Button
                    data-toggle="modal"
                    variant="info"
                    onClick={() => {
                      handleShow();
                      editCheckTask(item);
                    }}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => {
                      confirmAlert({
                        title: "Delete Task !",
                        message: "Are you sure to do this?",
                        buttons: [
                          {
                            label: "Yes",
                            onClick: () => deleteCheckTask(item),
                          },
                          {
                            label: "No",
                            onClick: () => {
                              return;
                            },
                          },
                        ],
                      });
                    }}
                  >
                    Delete
                  </Button>
                </span>
              </label>
            </div>
          );
        })}
      </div>
      <CompletedTask
        completedList={completedList}
        setcompletedList={setcompletedList}
        taskList={taskList}
        settaskList={settaskList}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm
            taskList={taskList}
            settaskList={settaskList}
            editName={editName}
            handleClose={handleClose}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
