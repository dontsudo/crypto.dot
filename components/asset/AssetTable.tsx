import { Box, Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { fetchTickers, selectTicker } from '../../services/ticker/tickerSlice';
import type { Ticker } from '../../services/ticker/tickerTypes';
import Loader from '../shared/Loader';

type Direction = 'up' | 'down' | 'maintain';

type AssetTableRowProps = {
  name: string;
  value: Ticker;
  prevValue: Ticker;
};

const AssetTableRow: React.FC<AssetTableRowProps> = ({ name, value, prevValue }) => {
  const direction: Direction =
    prevValue.closing_price < value.closing_price
      ? 'up'
      : prevValue.closing_price > value.closing_price
      ? 'down'
      : 'maintain';

  return (
    <Grid
      templateColumns="1fr minmax(0, 2fr) minmax(0, 1fr) minmax(0, 2fr)"
      columnGap={2}
      borderBottom="1px"
      borderBottomColor="gray.200"
      pt={4}
      pb={4}
    >
      <GridItem>{name}</GridItem>
      <GridItem
        textAlign="right"
        outline={direction !== 'maintain' ? '1px solid' : undefined}
        outlineColor={
          direction === 'up' ? 'green.200' : direction === 'down' ? 'red.200' : undefined
        }
        textColor={+value.fluctate_rate_24H > 0 ? 'green.200' : 'red.200'}
      >
        {Number(value.closing_price).toLocaleString()}
      </GridItem>
      <GridItem
        textAlign="right"
        textColor={+value.fluctate_rate_24H > 0 ? 'green.200' : 'red.200'}
      >
        {Number(value.fluctate_rate_24H)}%
      </GridItem>
      <GridItem textAlign="right">
        {Math.floor(Number(value.acc_trade_value_24H) / 10_000).toLocaleString()}
      </GridItem>
    </Grid>
  );
};

const AssetTable: React.FC = () => {
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
    <Box>
      <Grid
        templateColumns="1fr minmax(0, 2fr) minmax(0, 1fr) minmax(0, 2fr)"
        columnGap={2}
        borderBottom="1px"
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
          거래금액 (만원)
        </GridItem>
      </Grid>
      {Object.entries(current.data).map(([name, value]) => (
        <AssetTableRow key={name} name={name} value={value} prevValue={prev.data[name]} />
      ))}
    </Box>
  );
};

export default AssetTable;
