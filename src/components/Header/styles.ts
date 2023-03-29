import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 2.5rem;
    height: 2.5rem;

    object-fit: cover;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    a {
      padding: 0.75rem;

      width: auto;
      height: auto;

      display: flex;
      align-items: center;
      justify-content: center;

      color: ${(props) => props.theme['gray-100']};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      transition: all 0.2s ease-in-out;

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }

      &.active {
        color: ${(props) => props.theme['green-500']};
      }
    }
  }
`
