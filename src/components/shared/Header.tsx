import { Button, Flex, Heading, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import React from 'react';

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex justifyContent="space-between" pt="4" pb="4">
      <Heading color="green.500">🐂 CRYPTO.DOT</Heading>
      <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
      </Button>
    </Flex>
  );
};

export default Header;
