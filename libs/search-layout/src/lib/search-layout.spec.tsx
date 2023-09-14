import { render } from '@testing-library/react';

import SearchLayout from './search-layout';

describe('SearchLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SearchLayout isStale pairs={{ current: '', deffered: '' }} />
    );
    expect(baseElement).toBeTruthy();
  });
});
