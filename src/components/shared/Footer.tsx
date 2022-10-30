import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <Flex justifyContent="flex-end" pt="4" pb="4">
      <Text>@Powered by bithumb</Text>
    </Flex>
  );
};

export default Footer;
