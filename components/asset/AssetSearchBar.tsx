import { Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import React, { useCallback } from 'react';

type AssetSearchBarProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const AssetSearchBar: React.FC<AssetSearchBarProps> = ({ searchValue, setSearchValue }) => {
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
      <Input value={searchValue} onChange={handleChange} />
    </InputGroup>
  );
};

export default AssetSearchBar;
