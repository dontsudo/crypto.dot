import axios from 'axios';

import type { TickerResponse } from './tickerTypes';

const BITHUMB_API_URL = 'https://api.bithumb.com';
const UPBIT_API_URL = 'https://api.bithumb.com';

export default {
  bithumb: {
    fetchTickerList: async () =>
      axios.get<TickerResponse>(`${BITHUMB_API_URL}/public/ticker/ALL_KRW`),
  },
  upbit: {
    fetchTickerList: async () => axios.get<TickerResponse>(`${UPBIT_API_URL}/public/ticker`),
  },
};
