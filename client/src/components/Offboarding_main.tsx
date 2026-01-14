import { useState, useEffect } from "react";
import { ToDoItem_2 } from "./ToDoItem_2";
import { API_URL } from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import "./theme.css"; // Remove the "components/" part
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";
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
  const [modal, setModal] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");

  async function removeTask(taskId: number) {
    deleteTaskMutation.mutate(taskId);
  }

  const deleteTask = async (taskId: number): Promise<void> => {
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
    return;
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
      <div className="flex justify-start pt-20 flex-col min-h-screen items-center border bg-gray-100">
        <div className="w-full max-w-3xl border rounded-lg shadow-1g bg-white max-h-[90vh] overflow-auto flex flex-col items-center">
          <div className="flex gap-3">
            <Input className="flex" />
            <Button className="">Filter</Button>
            <Button className="table-1 btn" onClick={() => toggleModal()}>
              Neuen Mitarbeiter hinzufügen?
            </Button>
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
        </div>
      </div>
    </>
  );
}

export default Offboarding_main;
