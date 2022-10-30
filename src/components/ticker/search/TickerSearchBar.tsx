import { Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import React, { useCallback } from 'react';

type TickerSearchBarProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const TickerSearchBar: React.FC<TickerSearchBarProps> = ({ searchValue, setSearchValue }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    [setSearchValue]
  );

  return (
    <InputGroup pb="4" size="sm">
      <InputLeftElement pointerEvents="none">
        <Search2Icon />
      </InputLeftElement>
      <Input
        value={searchValue}
        onChange={handleChange}
        placeholder="Search the symbols (e.g., BTC, DOGE)"
      />
    </InputGroup>
  );
};

export default TickerSearchBar;
