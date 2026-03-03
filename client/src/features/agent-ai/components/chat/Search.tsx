import { Dispatch, SetStateAction } from 'react';

type SearchProps = {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
};

const Search = ({ message, setMessage }: SearchProps) => {
  return (
    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="w-full outline-none ml-2 text-xl"
      placeholder="Frage über deine Mitarbeiter"
    />
  );
};

export default Search;
