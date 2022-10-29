import { Grid, GridItem, Text } from '@chakra-ui/react';

import { TickerResponse } from '../../services/ticker/tickerTypes';

interface AssetTableBodyProps {
  prev: TickerResponse;
  current: TickerResponse;
}

export default function AssetTableBody({ prev, current }: AssetTableBodyProps) {
  return (
    <>
      {Object.entries(current.data).map(([name, value]) => {
        const isPriceIncrease = prev.data[name].closing_price < value.closing_price;

        return (
          <Grid
            key={name}
            templateColumns="1fr minmax(0, 2fr) minmax(0, 1fr) minmax(0, 2fr)"
            columnGap={2}
            alignItems="center"
            pt={4}
            pb={4}
            borderBottom="1px solid"
            borderBottomColor="gray.100"
          >
            <GridItem>{name}</GridItem>
            <GridItem textAlign="right" bgColor={isPriceIncrease ? 'red.400' : undefined}>
              {value.closing_price}
            </GridItem>
            <GridItem textAlign="right">{value.fluctate_rate_24H}%</GridItem>
            <GridItem textAlign="right">{Math.ceil(+value.acc_trade_value_24H)}원</GridItem>
          </Grid>
        );
      })}
    </>
  );
}
