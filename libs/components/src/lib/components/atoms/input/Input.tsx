import styled from 'styled-components';

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.white.shadows.inputShadow};
`;
