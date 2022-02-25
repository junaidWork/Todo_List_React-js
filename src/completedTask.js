import React from "react";
import { confirmAlert } from "react-confirm-alert";
import { Button } from "react-bootstrap";

export default function CompletedTask({
  completedList,
  setcompletedList,
  taskList,
  settaskList,
}) {
  const deleteCompletedTask = (item) => {
    var result = completedList.filter((i) => {
      return i.id !== item.id;
    });
    setcompletedList(result);
  };

  const moveToPending = (item) => {
    settaskList((taskList) => {
      return [...taskList, item];
    });

    var result = completedList.filter((i) => {
      return i.id !== item.id;
    });
    setcompletedList(result);
  };
  return (
    <>
      <div style={{ margin: "20px" }}>
        <h1 className="text-center">Completed Task</h1>
        {completedList.map((item, index) => {
          const { id, task } = item;
          return (
            <div key={index}>
              <ul>
                <li>
                  <span style={{ marginRight: "100px" }}>{task} </span>{" "}
                  <span>
                    <Button
                      variant="success"
                      onClick={() => {
                        moveToPending(item);
                      }}
                    >
                      Move to Pending
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
                              onClick: () => deleteCompletedTask(item),
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
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
