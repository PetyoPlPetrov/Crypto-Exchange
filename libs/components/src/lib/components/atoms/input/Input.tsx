import styled from 'styled-components';

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.white.shadows.inputShadow};
  &:focus {
    border: 1.4px solid #c9c6c6;
  }
`;
