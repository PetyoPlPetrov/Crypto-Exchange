import { FlexContainer } from 'libs/components';
import styled from 'styled-components';
import { Exchange } from '../types';

const RowWrapper = styled(FlexContainer)<{ isStale: boolean }>`
  cursor: pointer;
  box-shadow: ${(props) => props.theme.white.shadows.itemRow};
  padding: 1rem;
  opacity: ${(props) => (props.isStale ? 0.5 : 1)};

  &:hover {
    background-color: ${(props) =>
      props.theme.white.backgrounds.secondaryBackground};
  }
`;

export const Row = ({
  name,
  value,
  platform,
  isStale,
}: Exchange & { isStale: boolean }) => {
  return (
    <RowWrapper isStale={isStale} gap="0.5rem" justifyContent="space-between">
      <FlexContainer gap="0.5rem">
        <div style={{ minWidth: '5rem' }}> {name?.toUpperCase()} </div>
        <div style={{ minWidth: '5rem' }}>
          {' '}
          {typeof value === 'number' ? `1/ ${value}` : 'Not supported'}{' '}
        </div>
      </FlexContainer>
      <div> {platform} </div>
    </RowWrapper>
  );
};
