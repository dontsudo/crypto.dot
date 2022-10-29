import React from 'react';
import { NextPage } from 'next';
import { Container } from '@chakra-ui/react';
import AssetTable from '../components/asset/AssetTable';

const Index: NextPage = () => {
  return (
    <Container>
      <AssetTable />
    </Container>
  );
};

export default Index;
