import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import { API_URL } from "@/api";

type Inputs = {
  Vorname: string;
  Nachname: string;
  Geburtsdatum: string;
  Eintrittsdatum: string;
  Adresse: string | number;
  Position: string;
};

interface WorkerDataFormProps {
  type: "Onboarding" | "Offboarding";
  onSubmit: (data: Inputs) => void;
}

export const WorkerDataForm = ({ type, onSubmit }: WorkerDataFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <>
      <form className="flex flex-col max-w-2xl justify-center gap-6 mx-auto">
        <div className="flex flex-row gap-6 mx-auto">
          <div className="flex flex-col gap-4 items-center focus:outline-none">
            <input
              className="w-64 p-2 border-gray-300 border-2 rounded-xl"
              type="text"
              placeholder="Vorname"
              {...register("Vorname")}
            />
            <input
              className="w-64 p-2 border-gray-300 border-2 rounded-xl"
              type="text"
              placeholder="Nachname"
              {...register("Nachname")}
            />
            <input
              className="w-64 p-2 border-gray-300 border-2 rounded-xl"
              type="text"
              defaultValue="test"
              placeholder="DD.MM.YYYY"
              {...register("Geburtsdatum")}
            />
            <input
              className="w-64 p-2 border-gray-300 border-2 rounded-xl"
              type="text"
              placeholder="Adresse"
              {...register("Adresse")}
            />
            {errors.Eintrittsdatum && <span>This field is required</span>}
          </div>

          <div className="flex flex-col max-w-md gap-4">
            {/* <Input placeholder="name" /> */}
            <input
              className="w-64 p-2 border-gray-300 border-2 rounded-xl"
              type="text"
              defaultValue="test"
              placeholder="DD.MM.YYYY"
              {...register("Eintrittsdatum")}
            />
            <input
              className="w-64 p-2 border-gray-300 border-2 rounded-xl"
              type="text"
              placeholder="Position"
              {...register("Position")}
            />
          </div>
        </div>
        <Button
          className="self-center"
          // onClick={async () => {
          //   try {
          //     const response = await onSubmit(stateTask);
          //     if (response.success) {
          //       newStateTask("");
          //       onSuccess?.();
          //     }
          //     return;
          //   } catch (error) {
          //     setError(
          //       error instanceof Error ? error.message : "something else"
          //     );
          //   }
          // }}
        >
          Hinzufügen
        </Button>
      </form>
    </>
  );
};
