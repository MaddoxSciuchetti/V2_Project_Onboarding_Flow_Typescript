interface RadioProps {
  id: string;
}

export const Testing_Component = ({ id }: RadioProps) => (
  <div className="flex gap-2 items-start">
    <div className="grid place-items-center mt-1">
      <input
        type="radio"
        id={id}
        className="
        col-start-1 row-start-1
        appearance-none shrink-0
        w-4 h-4 border-2 border-blue-500 rounded-full
      "
      />
      <div
        className="
        col-start-1 row-start-1
        w-2 h-2 rounded-full bg-blue-500"
      />
    </div>
    <label htmlFor={id} className="text-start">
      This is the radio label
    </label>
  </div>
);
