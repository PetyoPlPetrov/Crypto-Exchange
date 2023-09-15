import { FlexContainer } from 'libs/components';
import { memo } from 'react';
import styled from 'styled-components';
import { Exchange } from '../types';
import { Row } from './Row';
import { RotatableIcon } from './SortIcon';

const Layout = styled(FlexContainer)`
  box-shadow: ${(props) => props.theme.white.shadows.buttonShadow};
  gap: 1.5rem;
  padding: 2rem;
  width: 50%;
  min-height: 70vh;
`;

const TableHeaderBottom = styled.div`
  border-bottom: 1px solid grey;
`;

const TableHeader = ({ children }: React.PropsWithChildren) => {
  return (
    <TableHeaderBottom>
      <FlexContainer justifyContent="space-between">
        <FlexContainer gap="2rem">
          <h3> Exchange </h3>
          <FlexContainer gap="0.2rem" alignItems="baseline">
            <h3>Rate</h3>
            <span>{children}</span>
          </FlexContainer>
        </FlexContainer>
        <h3> Platform </h3>
      </FlexContainer>
    </TableHeaderBottom>
  );
};

export const LayoutContainer = memo(
  ({
    sortedData,
    isStale,
    onSortDirectionChange,
    ascending,
    isLoading,
  }: {
    sortedData: Exchange[];
    isStale: boolean;
    onSortDirectionChange: () => void;
    ascending: boolean;
    isLoading: boolean;
  }) => {
    return (
      <Layout
        flexDirection="column"
        gap="0.5rem"
        padding="0.5rem"
        justifyContent="start"
      >
        <TableHeader>
          <RotatableIcon
            disbaled={sortedData.length <= 1}
            onClick={onSortDirectionChange}
            rotate={!ascending ? 180 : 0}
          >
            &#9650;
          </RotatableIcon>
        </TableHeader>
        {isLoading || isStale
          ? sortedData.length === 0 && <h1>Loading...</h1>
          : null}
        {sortedData.map((item: Exchange) => (
          <Row isStale={isStale} key={item.name + item.value} {...item}></Row>
        ))}
      </Layout>
    );
  }
);
