import styled from 'styled-components'

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
