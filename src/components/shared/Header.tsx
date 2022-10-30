import { Button, Flex, Heading, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import React from 'react';

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex justifyContent="space-between" alignItems="center" pt="4" pb="4">
      <Heading color="green.500">🐂 CRYPTO.DOT</Heading>
      <Button size="sm" onClick={toggleColorMode} mt={1}>
        {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
      </Button>
    </Flex>
  );
};

export default Header;
