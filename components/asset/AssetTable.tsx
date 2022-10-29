import { useEffect } from 'react';

import { Box, Grid, GridItem } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { fetchTickers, selectTicker } from '../../services/ticker/tickerSlice';
import Loader from '../shared/Loader';
import AssetTableBody from './AssetTableBody';

export default function AssetTable() {
  const dispatch = useAppDispatch();

  const { prev, current, isLoading } = useAppSelector(selectTicker);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch(fetchTickers());
    }, 500);

    return () => clearInterval(id);
  }, [dispatch]);

  if (!prev || !current || (!current && isLoading)) {
    return <Loader />;
  }

  return (
    <>
      <Box>
        <Grid
          templateColumns="1fr minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 2fr)"
          columnGap={2}
          borderBottom="1px solid"
          borderBottomColor="gray.200"
          pb={2}
        >
          <GridItem fontSize="0.875rem" lineHeight="1.25rem">
            기호
          </GridItem>
          <GridItem textAlign="right" fontSize="0.875rem" lineHeight="1.25rem">
            현재가
          </GridItem>
          <GridItem textAlign="right" fontSize="0.875rem" lineHeight="1.25rem">
            변동률
          </GridItem>
          <GridItem textAlign="right" fontSize="0.875rem" lineHeight="1.25rem">
            거래금액
          </GridItem>
        </Grid>
        <AssetTableBody current={current} prev={prev} />
      </Box>
    </>
  );
}
