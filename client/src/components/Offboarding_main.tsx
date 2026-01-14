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
import Modal from "./Modal";

type OffboardingItem = {
  id: number;
  name: string;
};

// something along the lines of, when offboarding button is clicked than fetch and display that data (hide the other)
// similiar to a toggle, should also have search function

function Offboarding_main() {
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

  const [newTask, setNewTask] = useState<string>("");

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

  function handleSuccessfullSubmission() {
    toggleModal();
    queryClient.invalidateQueries({ queryKey: ["offboarding"] });
  }

  useEffect(() => {
    if (modal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  }, [modal]);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <Button className="table-1 btn" onClick={() => toggleModal()}>
        Neuen Mitarbeiter hinzufügen?
      </Button>

      {data?.map((task: any) => (
        <ToDoItem_2
          key={task.id}
          item_value={task.id}
          item={task.name}
          onRemove={removeTask}
          gotopage={handlepage}
        />
      ))}

      {modal && (
        <div className="fixed inset-0 bg-black0/60">
          <Modal
            toggleModal={toggleModal}
            stateTask={newTask}
            newStateTask={setNewTask}
            onSuccess={handleSuccessfullSubmission}
          />
        </div>
      )}
    </>
  );
}

export default Offboarding_main;
