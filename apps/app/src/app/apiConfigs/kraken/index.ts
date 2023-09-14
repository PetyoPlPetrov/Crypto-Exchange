import { ExchangeResponse } from '../../types';

export const getKrakenData = async (
  args: string
): Promise<ExchangeResponse> => {
  const krakenApiUrl = 'https://api.kraken.com/0/public/Ticker';
  const tradingPairs = args.split(',').map((e) => e.trim());

  return fetch(`${krakenApiUrl}?pair=${tradingPairs}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then(
      ({ result = {}, error }) => {
        if (error?.length > 0) {
          throw new Error(error);
        }
        const keys = Object.keys(result);
        const pairs = keys.map((tradingPair) => {
          const data = result[tradingPair];
          return {
            [tradingPair.toUpperCase()]: parseFloat(data?.c?.[0])?.toFixed(2),
          };
        });

        return { name: 'Kraken', pairs };
      },
      (err) => {
        return {
          name: 'Kraken',
          pairs: tradingPairs.map((e) => ({ [e]: err.substring(0, 18) })),
        };
      }
    )
    .catch(() => {
      return {
        name: 'Kraken',
        pairs: tradingPairs.map((e) => ({ [e]: 'Not supported' })),
      };
    });
};
