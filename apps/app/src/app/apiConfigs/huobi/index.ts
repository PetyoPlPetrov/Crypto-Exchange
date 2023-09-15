import { ExchangeResponse } from '../../types';

type HuobiExchangepair = { symbol: string; close: string };
export const getHuobiData = async (args: string): Promise<ExchangeResponse> => {
  const tradingPairs = args.split(',').map((e) => e.trim().replace('/', ''));

  const apiUrl = 'https://api.huobi.pro/market'; // Base URL for Huobi public API
  const fullUrl = `${apiUrl}/tickers?symbol=${tradingPairs.join(',')}`;

  return fetch(fullUrl)
    .then((response) => response.json())
    .then(({ data = [] }) => {
      const pairs = data
        .filter((e: HuobiExchangepair) =>
          tradingPairs.some((p) => e.symbol === p)
        )
        .map((currentPair: HuobiExchangepair) => {
          return {
            [currentPair.symbol.toUpperCase()]: parseFloat(
              currentPair?.close
            ).toFixed(2),
          };
        });

      return { name: 'Huobi', pairs };
    })
    .catch((err) => {
      return {
        name: 'Huobi',
        pairs: tradingPairs.map((e) => ({ [e]: err.substring(0, 18) })),
      };
    });
};
