import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

const Header: React.FC = () => {
  return (
    <Flex justifyContent="center" pt="4" pb="4">
      <Heading color="green.800">🐂 CRYPTO.DOT</Heading>
    </Flex>
  );
};

export default Header;
