import "./Modal.css";
import { TiDelete } from "react-icons/ti";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { API_URL } from "@/api";
import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";
import { WorkerDataForm } from "./workerData";

interface ModalProps {
  toggleModal?: () => void;
  stateTask: string;
  newStateTask?: (value: string) => void;
  onSuccess?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  toggleModal,
  stateTask,
  newStateTask,
  onSuccess,
}) => {
  const [selectedOption, setSelectedOption] = useState<
    "Onboarding" | "Offboarding"
  >("Onboarding");

  return (
    <>
      <div className="modal">
        <div
          onClick={toggleModal}
          className="h-screen inset-0 fixed z-4ß bg-black/60"
        ></div>
        <div className="absolute text-center items-center z-50 bg-gray-200 rounded-xl top-[50%] left-[50%] h-6/12 w-4xl -translate-x-1/2 -translate-y-1/2">
          <div>
            <input
              className="border-3 border-blue-500 rounded-full "
              id="Onboarding"
              type="radio"
              name="radio"
              value="Onboarding"
              checked={selectedOption === "Onboarding"}
              onChange={(e) =>
                setSelectedOption(
                  e.target.value as "Onboarding" | "Offboarding"
                )
              }
            />
            <label htmlFor={"Onboarding"}>Onboarding</label>
            <input
              id="Offboarding"
              type="radio"
              name="radio"
              value="Offboarding"
              checked={selectedOption === "Offboarding"}
              onChange={(e) =>
                setSelectedOption(
                  e.target.value as "Onboarding" | "Offboarding"
                )
              }
            />
            <label htmlFor="Offboarding">Offboarding</label>
            {selectedOption === "Onboarding" && (
              <WorkerDataForm
                type={selectedOption}
                success={onSuccess}
                newStateTask={newStateTask}
              />
            )}
            {selectedOption === "Offboarding" && (
              <WorkerDataForm
                type={selectedOption}
                newStateTask={newStateTask}
              />
            )}
            <TiDelete className="x-item" onClick={toggleModal} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
