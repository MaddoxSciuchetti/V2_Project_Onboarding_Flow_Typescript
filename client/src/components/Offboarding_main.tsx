import { useState, useEffect } from "react";
import { ToDoItem_2 } from "./ToDoItem_2";
import { API_URL } from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

type OffboardingItem = {
  id: number;
  name: string;
};

// something along the lines of, when offboarding button is clicked than fetch and display that data (hide the other)
// similiar to a toggle, should also have search function

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
    mutationFn: (name: string) => {
      return fetch(`${API_URL}/offboarding/postoffboardingdata`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
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
      throw new Error("Failed to delete task");
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

  const [modal, setModal] = useState<boolean>(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) return <div>this is the modal</div>;

  return (
    <>
      <Input
        className="table-1 input-box"
        id="1"
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Name"
      />
      <Button className="table-1 btn" onClick={handleSubmit}>
        Neuen Mitarbeiter hinzufügen?
      </Button>

      <div className="flex w-full max-w-md flex-col gap-6">
        <Item variant="outline" className="flex w-full flex-row gap-10">
          // nex
          <ItemActions>
            <Button variant="outline" size="sm">
              Action
            </Button>
          </ItemActions>
        </Item>
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
    </>
  );
}

export default Offboarding_main;
