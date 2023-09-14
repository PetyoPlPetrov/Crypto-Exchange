import { GlobalStyles, theme } from 'libs/components';
import { DataProvider } from 'libs/services';
import { useState } from 'react';
import { SearchBar } from 'search-bar';
import { SearchLayout } from 'search-layout';
import { ThemeProvider } from 'styled-components';
import { getKrakenData } from './apiConfigs/kraken';
import { getHuobiData } from './apiConfigs/huobi';

const context = {
  api: [getKrakenData, getHuobiData],
};

export function App() {
  const [state, setState] = useState({ current: '', deffered: '' });
  const isStale = state.current !== state.deffered;

  return (
    <ThemeProvider theme={theme}>
      <DataProvider.Provider value={context}>
        <GlobalStyles />
        <div role="navigation">
          <SearchBar onSearchChanged={setState} />
          <SearchLayout pairs={state} isStale={isStale} />
        </div>
      </DataProvider.Provider>
    </ThemeProvider>
  );
}

export default App;
