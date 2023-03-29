import styled, { css } from 'styled-components';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'success';

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const ButtonVariants = {
  primary: 'pruple',
  secondary: 'orange',
  danger: 'red',
  warning: 'yellow',
  success: 'green',
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 150px;
  height: 56px;

  ${(props) => {
    return css`
      background-color: ${ButtonVariants[
        props.variant
      ]};
    `;
  }}
`;
