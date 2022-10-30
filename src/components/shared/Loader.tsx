import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';

const Loader: React.FC = () => {
  return (
    <Center h="100vh">
      <Spinner />
    </Center>
  );
};

export default Loader;
