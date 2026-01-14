import "./Modal.css";
import { TiDelete } from "react-icons/ti";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { API_URL } from "@/api";
import { useForm, SubmitHandler } from "react-hook-form";

interface ModalProps {
  toggleModal?: () => void;
  completeRemove?: (value_item: number) => void;
  stateTask: string;
  newStateTask?: (value: string) => void;
  onSuccess?: () => void;
}

export const sendWorkerData = async (name: string): Promise<any> => {
  return fetch(`${API_URL}/offboarding/postoffboardingdata`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ name }),
  }).then((res) => res.json());
};

const Modal: React.FC<ModalProps> = ({
  toggleModal,
  completeRemove,
  stateTask,
  newStateTask,
  onSuccess,
}) => {
  const [error, setError] = useState<string>("");

  return (
    <>
      <div className="modal">
        <div
          onClick={toggleModal}
          className="h-screen inset-0 fixed z-4ß bg-black/60"
        ></div>
        <div className="absolute text-center z-50 bg-gray-200 rounded-xl top-[50%] left-[50%] h-7/12 w-4xl pl-10 -translate-x-1/2 -translate-y-1/2">
          <div>
            <Input
              className="table-1 input-box"
              id="1"
              type="text"
              value={stateTask}
              onChange={(e) => newStateTask(e.target.value)}
              placeholder="Name"
            />
            <TiDelete className="x-item" onClick={toggleModal} />
            <p>Place holder for adding the person</p>
            <Button
              onClick={async () => {
                try {
                  const response = await sendWorkerData(stateTask);
                  if (response.success) {
                    newStateTask("");
                    onSuccess?.();
                  }
                  return;
                } catch (error) {
                  setError(
                    error instanceof Error ? error.message : "something else"
                  );
                }
              }}
            >
              Here
            </Button>
          </div>
          <h2 className="styling">
            Mit diser Aktion wird der Mitarbeiter und sein Fortschritt gelöscht
          </h2>
          {/* <button
            className="close-modal styling"
            onClick={() => {
              toggleModal(), completeRemove(value_item);
            }}
          >
            Löschen
          </button> */}
          {error && <div>{error}</div>}
        </div>
      </div>
    </>
  );
};

export default Modal;
