export const getKrakenData = async (args: string) => {
  const krakenApiUrl = 'https://api.kraken.com/0/public/Ticker';
  const tradingPairs = args
    .toUpperCase()
    .split(',')
    .map((e) => e.trim());

  return fetch(`${krakenApiUrl}?pair=${tradingPairs}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then(({ result }) => {
      if (!result) {
        return [];
      }
      return tradingPairs.map((tradingPair) => {
        const data = result[tradingPair];
        return parseFloat(data?.c?.[0])?.toFixed(2);
      });
    });
};
