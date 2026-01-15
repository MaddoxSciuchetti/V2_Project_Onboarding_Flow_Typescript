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
  completeRemove?: (value_item: number) => void;
  stateTask: string;
  newStateTask?: (value: string) => void;
  onSuccess?: () => void;
}

// export const sendWorkerData = async (name: string): Promise<any> => {
//   return fetch(`${API_URL}/offboarding/postoffboardingdata`, {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify({ name }),
//   }).then((res) => res.json());
// };

const formValidation = z.object({
  Vorname: z.string(),
  Nachname: z.string(),
  Geburtsdatum: z
    .string()
    .min(1, "Datum ist notwendig")
    .regex(/^\d{2}\.\d{2}\.\d{4}$/, "Format: DD.MM.YYYY")
    .refine((date) => {
      const [day, month, year] = date.split(".").map(Number);
      const dateObj = new Date(year, month - 1, day);
      return (
        dateObj.getDate() === day &&
        dateObj.getMonth() === month - 1 &&
        dateObj.getFullYear() === year
      );
    }, "Invalid Date"),
});

const Modal: React.FC<ModalProps> = ({
  toggleModal,
  completeRemove,
  stateTask,
  newStateTask,
  onSuccess,
}) => {
  const [error, setError] = useState<string>("");

  type Inputs = {
    Vorname: string;
    Nachname: string;
    Geburtsdatum: string;
    Eintrittsdatum: string;
    Adresse: string | number;
    Position: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    return fetch(`${API_URL}/offboarding/postoffboardingdata`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ data }),
    }).then((res) => res.json());
  };

  const [selectedOption, setSelectedOption] = useState<
    "Onboarding" | "Offboarding"
  >("Onboarding");

  console.log(watch("Eintrittsdatum"));

  return (
    <>
      <div className="modal">
        <div
          onClick={toggleModal}
          className="h-screen inset-0 fixed z-4ß bg-black/60"
        ></div>
        <div className="absolute text-center z-50 bg-gray-200 rounded-xl top-[50%] left-[50%] h-6/12 w-4xl -translate-x-1/2 -translate-y-1/2">
          <div>
            <label>
              <input
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
              Onboarding
            </label>
            <label>
              <input
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
              Offboarding
            </label>
            {selectedOption === "Onboarding" && (
              <WorkerDataForm type={selectedOption} onSubmit={onSubmit} />
            )}

            {selectedOption === "Offboarding" && (
              <WorkerDataForm type={selectedOption} onSubmit={onSubmit} />
            )}

            {/* <Input
              className="table-1 input-box"
              id="1"
              type="text"
              value={stateTask}
              onChange={(e) => newStateTask(e.target.value)}
              placeholder="Name"
            /> */}
            <TiDelete className="x-item" onClick={toggleModal} />
          </div>
          {error && <div>{error}</div>}
        </div>
      </div>
    </>
  );
};

export default Modal;
