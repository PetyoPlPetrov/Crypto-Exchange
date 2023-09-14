import { useDebounce } from 'libs/services';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CustomInput } from './components/CustomInput';
import { transformInputIntoSearchString } from './utils/';
import { InputContainer } from './components/InputContainer';
/* eslint-disable-next-line */
export interface SearchBarProps {
  onSearchChanged: Dispatch<
    SetStateAction<{ current: string; deffered: string }>
  >;
}

export function SearchBar({ onSearchChanged }: SearchBarProps) {
  const [value, setValue] = useState('');
  const deferredQuery = useDebounce(value, 2000);
  const deffered = transformInputIntoSearchString(deferredQuery);

  useEffect(() => {
    if (value) {
      onSearchChanged({
        current: value,
        deffered,
      });
    }
  }, [deferredQuery, value, deffered]);

  return (
    <>
      <h1>Type some crypto pairs</h1>

      <InputContainer>
        <CustomInput
          value={value}
          className="search-box"
          onChange={(e) => setValue(e.target.value)}
          placeholder="BTC/USD"
        ></CustomInput>
      </InputContainer>
    </>
  );
}

export default SearchBar;
