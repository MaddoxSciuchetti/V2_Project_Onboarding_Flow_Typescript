import { useState, useEffect } from "react";
import { ToDoItem_2 } from "./ToDoItem_2";
import { API_URL } from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import "./theme.css"; // Remove the "components/" part
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom"; // React Router, not TanStack
import { FormInputs } from "@/schemas/zodSchema";

type OffboardingItem = {
  employee_forms: {
    form_type: string;
  };
  id: number;
  nachname: string;
  vorname: string;
};

// something along the lines of, when offboarding button is clicked than fetch and display that data (hide the other)
// similiar to a toggle, should also have search function

function Offboarding_main() {
  async function fetchNameData(): Promise<OffboardingItem[]> {
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

  const navigate = useNavigate();

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offboarding"] });
    },
  });

  const onSubmit = useMutation({
    mutationFn: async (data: FormInputs) => {
      const response = await fetch(
        `${API_URL}/offboarding/postoffboardingdata`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ data }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit");
      }
      const result = await response.json();
      console.log(result);
      return result;
    },

    onSuccess: async (result) => {
      if (result.success) {
        await queryClient.invalidateQueries({
          queryKey: ["offboarding"],
          refetchType: "all",
        });
        toggleModal();
        setNewTask("");
      }
    },
    onError: (error) => {
      console.log("Submission failed", error);
    },
  });

  const handleNavigate = (taskId: number, form_type: any) => {
    const searchParams = new URLSearchParams({
      param1: form_type,
    });
    navigate(`/offboarding/user/${taskId}${searchParams.toString()}`);
  };

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

          {/* fix any here */}
          {data?.map((task: OffboardingItem) => (
            <ToDoItem_2
              key={task.id}
              item_value={task.id}
              form_type={task.employee_forms[0]?.form_type}
              item={task.vorname}
              onRemove={removeTask}
              gotopage={handleNavigate}
            />
          ))}

          {modal && (
            <div className="fixed inset-0 bg-black0/60">
              <Modal
                toggleModal={toggleModal}
                newStateTask={setNewTask}
                onSuccess={onSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Offboarding_main;
