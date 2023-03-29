import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.article`
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  font-size: 1.125rem;
  font-weight: 700;
  color: ${(props) => props.theme['gray-100']};
`

const BaseInput = styled.input`
  padding: 0 0.5rem;
  height: 2.5rem;

  font-size: 1.125rem;
  font-weight: inherit;
  color: ${(props) => props.theme['gray-100']};

  background: transparent;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`

export const CountdownContainer = styled.article`
  display: flex;
  align-items: center;
  gap: 1rem;

  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};

  span {
    padding: 2rem 1rem;

    background: ${(props) => props.theme['gray-700']};
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  width: 4rem;
  overflow: hidden;

  display: flex;
  justify-content: center;

  /* line-height: normal; */
  color: ${(props) => props.theme['green-500']};
`

export const StartCountdownButton = styled.button`
  padding: 1.125rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  background: ${(props) => props.theme['green-500']};
  border-radius: 8px;
  border: none;

  font-weight: 700;
  color: ${(props) => props.theme['gray-100']};

  cursor: pointer;

  transition: all 0.2s ease-in-out;

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
