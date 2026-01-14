import "./Modal.css";
import { TiDelete } from "react-icons/ti";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { API_URL } from "@/api";
import { APIResponse } from "@/types/api_response";

interface ModalProps {
  value_item?: number;
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
  value_item,
  toggleModal,
  completeRemove,
  stateTask,
  newStateTask,
  onSuccess,
}) => {
  return (
    <>
      <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
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
                  return error instanceof Error
                    ? error.message
                    : "Error occured";
                }
              }}
            >
              Here
            </Button>
          </div>
          <h2 className="styling">
            Mit diser Aktion wird der Mitarbeiter und sein Fortschritt gelöscht
          </h2>
          <button
            className="close-modal styling"
            onClick={() => {
              toggleModal(), completeRemove(value_item);
            }}
          >
            Löschen
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
