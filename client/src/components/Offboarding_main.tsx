import { useState, useEffect } from "react";
import { ToDoItem_2 } from "./ToDoItem_2";
import { API_URL } from "../api";
import "./on_form.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type OffboardingItem = {
  id: number;
  name: string;
};

function Offboarding_main() {
  const [newTask, setNewTask] = useState<string>("");

  async function fetchNameData() {
    const response = await (
      await fetch(`${API_URL}/offboarding/fetchData`)
    ).json();
    console.log("this is data send from server", response);
    return response;
  }

  const { data, error, isSuccess } = useQuery<OffboardingItem[]>({
    queryKey: ["offboarding"],
    queryFn: fetchNameData,
  });

  console.log("tanstack query data object", data);

  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: async (name: string) => {
      return fetch(`${API_URL}/offboarding/postoffboardingdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offboarding"] });
    },
  });

  function handleSubmit() {
    if (!newTask) return;
    createTaskMutation.mutate(newTask);
    setNewTask("");
  }

  async function removeTask(taskId: number) {
    deleteTaskMutation.mutate(taskId);
  }

  const deleteTask = async (taskId: number) => {
    const response = await fetch(`${API_URL}/offboarding/delete/${taskId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      throw new Error("faild to delete task");
    }
    return taskId;
  };

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offboarding"] });
    },
  });

  function handlepage(taskId: number) {
    window.location.href = `/offboarding/user/${taskId}`;
  }

  return (
    <>
      <div></div>
      <div className="main-list">
        <div className="list">
          <div className="sublist-2">
            <input
              className="table-1 input-box"
              id="1"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Name"
            />
            <button className="table-1 btn" onClick={handleSubmit}>
              Hinzufügen
            </button>
          </div>

          {data?.map((task: any) => (
            <ToDoItem_2
              key={task.id}
              item_value={task.id}
              item={task.name}
              onRemove={removeTask}
              gotopage={handlepage}
            />
          ))}
          {/* {state && state.map((value, key ) => (<ToDoItem_2 key={key} item={value.name} onRemove={removeTask} editRow={handleEditRow} gotopage={handlepage}/>))} */}
          {/* {error && <p>{error}</p>} */}
        </div>
      </div>
    </>
  );
}

export default Offboarding_main;
