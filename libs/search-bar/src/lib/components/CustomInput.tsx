import { Input } from 'libs/components';
import styled from 'styled-components';

export const CustomInput = styled(Input)<{ ready?: boolean }>`
  color: #333333;
  background-color: #f5f5f5;
  float: left;
  font-family: monospace;
  outline: none;
  font-size: 14px;

  padding: 0.5rem;
  min-width: 40%; /* Adjust the width as needed */

  box-shadow: ${(props) => props.theme.white.shadows.inputShadow};
  border: 1px solid ${(props) => props.theme.white.colors.secondary};
  border-radius: 5px;
`;
