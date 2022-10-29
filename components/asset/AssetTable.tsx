import { useEffect } from 'react';

import { Center, Spinner, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { fetchTickers, selectTicker } from '../../services/ticker/tickerSlice';

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
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <TableContainer fontSize="sm">
      <Table>
        <Thead>
          <Th>기호</Th>
          <Th>현재가</Th>
          <Th>전일대비</Th>
          <Th>거래대금</Th>
        </Thead>
        <Tbody>
          {Object.entries(current.data).map(([name, value]) => {
            const isPriceIncrease = prev.data[name].closing_price < value.closing_price;

            return (
              <Tr key={name}>
                <Td>{name}</Td>
                <Td bgColor={isPriceIncrease ? 'red.400' : undefined}>{value.closing_price}</Td>
                <Td>{value.fluctate_rate_24H}%</Td>
                <Td>{Math.ceil(+value.acc_trade_value)}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
