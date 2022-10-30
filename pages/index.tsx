import { Container, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';

import AssetTable from '../components/asset/AssetTable';
import Header from '../components/shared/Header';

const Index: NextPage = () => {
  return (
    <Container>
      <Header />
      <AssetTable />
      <Flex bg={useColorModeValue('white', 'gray.800')}>
        <Text>@Powered By Bithumb API</Text>
      </Flex>
    </Container>
  );
};

export default Index;
