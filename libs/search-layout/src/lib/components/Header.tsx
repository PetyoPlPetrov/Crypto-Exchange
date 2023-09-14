import { FlexContainer } from 'libs/components';
import { RotatableIcon } from './SortIcon';

export const Header = ({ onSortDirectionChange, ascending }) => {
  return (
    <>
      <FlexContainer alignItems="center" gap="1rem">
        <h1>Results</h1>
        <RotatableIcon
          onClick={onSortDirectionChange}
          rotate={!ascending ? 180 : 0}
        >
          &#9650;
        </RotatableIcon>
      </FlexContainer>
    </>
  );
};
