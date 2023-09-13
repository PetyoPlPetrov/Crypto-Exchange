import { DataProvider } from 'libs/services';
import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { SearchBar } from 'search-bar';
import { SearchLayout } from 'search-layout';
import { ThemeProvider } from 'styled-components';
import { theme } from 'libs/components';

const context = {
  api: [
    async () => {
      const krakenApiUrl = 'https://api.kraken.com/0/public/Ticker';
      const tradingPair = 'BTC/USD';

      return new Promise((res, rej) =>
        setTimeout(() => res([1, 2, 3]), 0)
      ).then((result) => {
        return new Promise((res) => {
          res(result);
        });
      });

      // fetch(`${krakenApiUrl}?pair=${tradingPair}`, {
      //   method: 'GET',
      //   headers: {
      //     // Include any necessary headers here (e.g., API keys)
      //   },
      // })
      //   .then((response) => response.json())
      //   .then(({result})=>{
      //     const data = result[tradingPair]

      //     const tickSizeUSD = parseFloat(data.tick_size); // Tick size in USD
      //     const feePercentage = parseFloat(data.fees[0][1]) / 100; // Fee percentage as a decimal (0.26%)

      //     const costOf1BTCinUSD = parseFloat(data.costmin.replace(',', ''));
      //   });
    },

    async () => {
      return new Promise((res, rej) =>
        setTimeout(() => res([4, 5, 6]), 0)
      ).then((result) => {
        return new Promise((res) => {
          res(result);
        });
      });
    },
  ],
};
export function App() {
  const [state, setState] = useState('');

  //   useEffect(()=>{

  //     ///
  //     const krakenApiUrl = 'https://api.kraken.com/0/public/Ticker';
  //     const tradingPair = 'BTC/USD';

  // {    fetch(`${krakenApiUrl}?pair=${tradingPair}`, {
  //       method: 'GET',
  //       headers: {
  //         // Include any necessary headers here (e.g., API keys)
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then(({result}) => {
  //       const data = result[tradingPair]
  //         // Handle the API response data here
  //         console.log('BTC/USD Pair Data:', data);
  //     const tickSizeUSD = parseFloat(data.tick_size); // Tick size in USD
  //   const feePercentage = parseFloat(data.fees[0][1]) / 100; // Fee percentage as a decimal (0.26%)

  //   const costOf1BTCinUSD = parseFloat(data.costmin.replace(',', ''));

  //   console.log('Actual Price of 1 BTC in USD:', costOf1BTCinUSD.toFixed(2));
  //       })
  //       .catch((error) => {
  //         // Handle errors here
  //         console.error(error);
  //       });}

  // {  const apiUrl = 'https://api.huobi.pro/market'; // Base URL for Huobi public API
  //             const endpoint = 'detail'; // Endpoint for ticker data
  //             const symbol = 'btcusdt'; // Trading pair symbol (BTC/USDT)
  //             const fullUrl = `${apiUrl}/detail?symbol=${symbol}`;

  //             fetch(fullUrl)
  //                 .then((response) => response.json())
  //                 .then((data) => {
  //                     // Handle the API response data
  //                     const resultDiv = document.getElementById("result");
  //                    console.log(data.tick.close);
  //                 })
  //                 .catch((error) => {
  //                     // Handle errors
  //                     console.error(error);
  //                 });
  //        }
  //   },[])
  return (
    <ThemeProvider theme={theme}>
      <DataProvider.Provider value={context}>
        <div role="navigation">
          <SearchBar text={state} onSearchChanged={setState} />
          <SearchLayout pairs={state} />
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/page-2">Page 2</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                This is the generated root route.{' '}
                <Link to="/page-2">Click here for page 2.</Link>
              </div>
            }
          />
          <Route
            path="/page-2"
            element={
              <div>
                <Link to="/">Click here to go back to root page.</Link>
              </div>
            }
          />
        </Routes>
        {/* END: routes */}
      </DataProvider.Provider>
    </ThemeProvider>
  );
}

export default App;
