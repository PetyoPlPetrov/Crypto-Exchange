import { withData } from './hocs/withData';

/* eslint-disable-next-line */
export interface SearchLayoutProps {
  data: any[];
}

function SearchLayoutInner({ data }: SearchLayoutProps) {
  console.log(data);

  return (
    <>
      <h1>Welcome to SearchLayout!</h1>
    </>
  );
}
export const SearchLayout = withData(SearchLayoutInner);
export default SearchLayout;
