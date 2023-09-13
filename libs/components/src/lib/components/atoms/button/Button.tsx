import React from 'react';
import styled from 'styled-components';
interface ButtonProps {
  /*Chanhe the background color of the button */
  backgroundColor?: string;
  /*Chanhe the text of the button */
  text?: string;
}

const ButtonInner = styled.button<ButtonProps>`
  display: block;
  background-color: ${(props) =>
    props.backgroundColor || props.theme.white.backgrounds.primaryBackground};
  color: ${(props) => props.theme.white.colors.primary};
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: ${(props) => props.theme.white.shadows.buttonShadow};
`;

export const Button = (props: ButtonProps) => {
  return <ButtonInner {...props}>{props.text}</ButtonInner>;
};
