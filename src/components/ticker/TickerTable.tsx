import { Box, Grid, GridItem } from "@chakra-ui/react";
import { includes, pickBy } from "lodash";
import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchTickers, selectTicker } from "../../services/ticker/tickerSlice";
import { Ticker } from "../../services/ticker/tickerTypes";
import Loader from "../shared/Loader";
import TickerSearchBar from "./TickerSearchBar";

type TrendDirection = "up" | "down" | "maintain";

type TickerTableRowProps = {
  name: string;
  value: Ticker;
  prevValue: Ticker;
};

const TickerTableRow: React.FC<TickerTableRowProps> = ({
  name,
  value,
  prevValue,
}) => {
  let trendDirection: TrendDirection = "maintain";
  if (prevValue.closing_price < value.closing_price) trendDirection = "up";
  else if (prevValue.closing_price > value.closing_price)
    trendDirection = "down";

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
        outline={trendDirection !== "maintain" ? "1px solid" : undefined}
        outlineColor={
          trendDirection === "up"
            ? "green.300"
            : trendDirection === "down"
            ? "red.300"
            : undefined
        }
        textColor={+value.fluctate_rate_24H > 0 ? "green.300" : "red.300"}
      >
        {Number(value.closing_price).toLocaleString()}
      </GridItem>
      <GridItem
        textAlign="right"
        textColor={+value.fluctate_rate_24H > 0 ? "green.300" : "red.300"}
      >
        {Number(value.fluctate_rate_24H)}%
      </GridItem>
      <GridItem textAlign="right">
        {Math.floor(
          Number(value.acc_trade_value_24H) / 10_000
        ).toLocaleString()}
      </GridItem>
    </Grid>
  );
};

const TickerTable: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useAppDispatch();
  const { prev, current, isLoading } = useAppSelector(selectTicker);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch(fetchTickers());
    }, 500);

    return () => clearInterval(id);
  }, [current, dispatch, searchValue]);

  if (!prev || !current || (!current && isLoading)) {
    return <Loader />;
  }

  const filteredTickers = pickBy(current.data, (_, k) =>
    includes(k.toLowerCase(), searchValue.toLowerCase())
  );

  return (
    <Box>
      <TickerSearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
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
      {Object.entries(filteredTickers).map(([name, value]) => (
        <TickerTableRow
          key={name}
          name={name}
          value={value}
          prevValue={prev.data[name]}
        />
      ))}
    </Box>
  );
};

export default TickerTable;
