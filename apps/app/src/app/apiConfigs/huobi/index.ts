export const getHuobiData = async (args: string) => {
  const tradingPairs = args.split(',').map((e) => e.trim().replace('/', ''));

  const apiUrl = 'https://api.huobi.pro/market'; // Base URL for Huobi public API
  const endpoint = 'detail'; // Endpoint for ticker data
  const symbol = 'btcusdt'; // Trading pair symbol (BTC/USDT)
  const fullUrl = `${apiUrl}/detail?symbol=${tradingPairs}`;

  return fetch(fullUrl)
    .then((response) => response.json())
    .then((data = {}) => {
      // Handle the API response data
      return [data?.tick?.close].filter(Boolean);
    });
};
