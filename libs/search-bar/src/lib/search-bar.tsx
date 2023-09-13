import { Input } from 'libs/components';
import { Dispatch, SetStateAction } from 'react';

/* eslint-disable-next-line */
export interface SearchBarProps {
  onSearchChanged: Dispatch<SetStateAction<string>>;
  text: string;
}

export function SearchBar({ onSearchChanged, text }: SearchBarProps) {
  return (
    <>
      <h1>Welcome to SearchBar!</h1>
      <Input
        value={text}
        onChange={(e) => onSearchChanged(e.target.value)}
      ></Input>
    </>
  );
}

export default SearchBar;
