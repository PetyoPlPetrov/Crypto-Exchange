import { memo, useCallback, useEffect, useState } from 'react';
import { LayoutContainer } from './components/Layout';
import { sortByNameAndPrice } from './helpers/sortData';
import { withData } from './hocs/withData';
import { Exchange } from './types';
import { withError } from './hocs/withError';

/* eslint-disable-next-line */
export interface SearchLayoutProps {
  data?: Exchange[];
  isStale: boolean;
  isLoading?: boolean;
}

function SearchLayoutInner({ data, isStale, isLoading }: SearchLayoutProps) {
  const [ascending, setAscending] = useState(true);
  const [sortedData, setSortedData] = useState<Exchange[]>([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setSortedData(data.sort(sortByNameAndPrice(ascending)));
    }
  }, [data]);

  const toggleSort = useCallback(() => {
    setAscending((p) => {
      setSortedData([...sortedData].sort(sortByNameAndPrice(!p)));
      return !p;
    });
  }, [sortedData]);

  return (
    <>
      <LayoutContainer
        onSortDirectionChange={toggleSort}
        ascending={ascending}
        isStale={isStale}
        sortedData={sortedData}
        isLoading={!!isLoading}
      />
    </>
  );
}

export const SearchLayout = withData(withError(memo(SearchLayoutInner)));
