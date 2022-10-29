import React from 'react';
import { Center, Spinner } from '@chakra-ui/react';

const Loader: React.FC = () => {
  return (
    <Center h="100vh">
      <Spinner />
    </Center>
  );
};

export default Loader;
