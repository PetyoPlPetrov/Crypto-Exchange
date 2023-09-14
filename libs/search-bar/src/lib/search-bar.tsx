import { useDebounce } from 'libs/services';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { CustomInput } from './components/CustomInput';
import { InputContainer } from './components/InputContainer';
import { transformInputIntoSearchString } from './utils/';
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

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    onSearchChanged({
      current: value,
      deffered,
    });
  }, [value, deffered]);

  return (
    <>
      <h1>Type some crypto pairs</h1>
      <InputContainer>
        <CustomInput
          value={value}
          ref={inputRef}
          className="search-box"
          onChange={(e) => setValue(e.target.value)}
          placeholder="BTC/USD or btcusd"
        ></CustomInput>
      </InputContainer>
    </>
  );
}
