import styled from 'styled-components'

export const LayoutContainer = styled.main`
  margin: 5rem auto;
  padding: 2.5rem;

  max-width: 74rem;
  height: calc(100vh - 10rem);

  display: flex;
  flex-direction: column;

  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px;
`
