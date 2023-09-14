import { memo } from 'react';
import { withData } from './hocs/withData';

/* eslint-disable-next-line */
export interface SearchLayoutProps {
  data?: any[];
  isStale: boolean;
}

function SearchLayoutInner({ data, isStale }: SearchLayoutProps) {
  return (
    <>
      <h1>Results</h1>
      <div
        style={{
          opacity: isStale ? 0.5 : 1,
        }}
      >
        {data?.map((exchange, ind) => {
          return (
            <div key={ind}>
              {exchange.map((pair: string) => (
                <div key={ind + pair}>{pair}</div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}
export const SearchLayout = withData(memo(SearchLayoutInner));
export default SearchLayout;
