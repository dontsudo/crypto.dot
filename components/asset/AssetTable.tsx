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
      <Center h="calc(100vh)">
        <Spinner />
      </Center>
    );
  }

  return (
    <TableContainer fontSize="13px">
      <Table>
        <Thead>
          <Th>기호</Th>
          <Th textAlign="right">현재가</Th>
          <Th textAlign="right">변동률</Th>
          <Th textAlign="right">거래금액</Th>
        </Thead>
        <Tbody>
          {Object.entries(current.data).map(([name, value]) => {
            const isPriceIncrease = prev.data[name].closing_price < value.closing_price;

            return (
              <Tr key={name}>
                <Td>{name}</Td>
                <Td bgColor={isPriceIncrease ? 'red.400' : undefined} isNumeric>
                  {value.closing_price}
                </Td>
                <Td isNumeric>{value.fluctate_rate_24H}%</Td>
                <Td isNumeric>{Math.ceil(+value.acc_trade_value_24H / 100_0000)} 백만원</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
