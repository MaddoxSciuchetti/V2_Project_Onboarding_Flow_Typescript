import { RefObject } from 'react';

type SearchProps = {
  handleClick: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
};

const Search = ({ handleClick, inputRef }: SearchProps) => {
  return (
    <input
      onKeyDown={(e) => {
        if (e.key == 'Enter') {
          handleClick();
        }
      }}
      ref={inputRef}
      className="w-full outline-none ml-2 text-xl"
      placeholder="Frage über deine Mitarbeiter"
    />
  );
};

export default Search;
