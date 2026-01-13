import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const queryClient = useQueryClient();

const [newTask, setNewTask] = useState();

const sendTaskData = async (newTask) => {
  return await fetch("/api/api", {
    method: "POST",
    headers: { "content-type": "appplication/json" },
    body: JSON.stringify("somevalue"),
  }).then((res) => res.json());
};

export const OnboardingComponent = () => {
  const mutation = useMutation({
    mutationFn: sendTaskData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offboarding"] });
    },
  });

  function handleSubmit(newTask: string) {
    if (!newTask) return;
    mutation.mutate(newTask);
  }
  return (
    <>
      <button onClick={() => handleSubmit(newTask)} />
    </>
  );
};
