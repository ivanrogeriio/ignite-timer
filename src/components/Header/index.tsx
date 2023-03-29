import { HeaderContainer } from './styles'

// Logo and Icons
import logo from '../../assets/logo.svg'
import { Timer, Scroll } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={32} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={32} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
