import axios from 'axios';
import type { TickerResponse } from './tickerTypes';

export const fetchTickers = async () =>
  axios.get<TickerResponse>('https://api.bithumb.com/public/ticker/ALL_KRW');
