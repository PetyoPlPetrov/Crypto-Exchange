import styled from 'styled-components';

export const RotatableIcon = styled.span<{
  rotate: number;
  disbaled?: boolean;
}>`
  display: inline-block;
  transform: rotate(${(props) => props.rotate || 0}deg);
  opacity: ${(props) => (props.disbaled ? 0.5 : 1)};
  cursor: ${(props) => (props.disbaled ? 'not-allowed' : 'pointer')};
  color: green;
`;
