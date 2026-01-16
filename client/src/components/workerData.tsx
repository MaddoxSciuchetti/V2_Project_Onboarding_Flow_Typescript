import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import { API_URL } from "@/api";
import z, { ZodSchema } from "zod";
import { useState } from "react";
import { DateSchema } from "@/schemas/schema";
import { UNSAFE_getTurboStreamSingleFetchDataStrategy } from "react-router-dom";

type Inputs = {
  Vorname: string;
  Nachname: string;
  Geburtsdatum: string;
  Eintrittsdatum: string;
  Adresse: string | number;
  Position: string;
  Austrittsdatum?: string;
};

const formValidation = z.object({
  Vorname: z.string(),
  Nachname: z.string(),
  Geburtsdatum: DateSchema,
  Adresse: z.string(),
  Eintrittsdatum: DateSchema,
  Position: z.string(),
});

function schemaValidation(type: string): ZodSchema {
  if (type === "Onboarding") {
    return formValidation;
  }
  if (type == "Offboarding") {
    return formValidation.extend({ Austrittsdatum: z.string() });
  }

  throw new Error(`${type} not working`);
}

interface WorkerDataFormProps {
  type: "Onboarding" | "Offboarding";
  success?: () => void;
  newStateTask?: (value: string) => void;
}

export const WorkerDataForm = ({
  type,
  success,
  newStateTask,
}: WorkerDataFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [error, setError] = useState<string | null>(null);
  const onSubmit = async (data: Inputs) => {
    try {
      const check = schemaValidation(type);
      const validationResult = check.safeParse(data);

      if (!validationResult.success) {
        setError("something went wrong");
        return;
      }
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
      const result = await response.json();
      if (result.success) {
        success?.();
        newStateTask?.("");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error occurred");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-2xl justify-center gap-6 mx-auto"
      >
        <div className="flex flex-row gap-6 mx-auto">
          <div className="flex flex-col gap-4 items-center focus:outline-none">
            {/* this should always be shown */}
            <label>Vorname</label>
            <input
              className="w-64 p-2 border-gray-300 border-2 rounded-xl"
              type="text"
              placeholder="Vorname"
              {...(register("Vorname"), { required: true })}
            />
            <label>Nachname</label>
            <input
              className="w-64 p-2 border-gray-300 border-2 rounded-xl"
              type="text"
              placeholder="Nachname"
              {...register("Nachname")}
            />
            <label>Geburtsdatum</label>
            <input
              className="w-64 p-2 border-gray-300 border-2 rounded-xl"
              type="text"
              placeholder="DD.MM.YYYY"
              {...register("Geburtsdatum")}
            />
            <label>Adresse</label>
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
            <label>Eintrittsdatum</label>
            <input
              className="w-64 p-2 border-gray-300 border-2 rounded-xl"
              type="text"
              placeholder="DD.MM.YYYY"
              {...register("Eintrittsdatum")}
            />

            {/* start of component that should only show in offboarding*/}

            {type === "Offboarding" ? (
              <>
                <label>Austrittsdatunm</label>
                <input
                  className="w-64 p-2 border-gray-300 border-2 rounded-xl"
                  type="text"
                  placeholder="DD.MM.YYYY"
                  {...register("Austrittsdatum")}
                />
              </>
            ) : (
              ""
            )}

            {/* end of component that should only show in offboarding */}
            <label>Position</label>
            <input
              className="w-64 p-2 border-gray-300 border-2 rounded-xl"
              type="text"
              placeholder="Position"
              {...register("Position")}
            />
          </div>
        </div>
        {error && error}
        <Button type="submit" className="self-center">
          Hinzufügen
        </Button>
      </form>
    </>
  );
};
