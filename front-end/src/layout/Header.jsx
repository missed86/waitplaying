// import logo from '../logo.svg';
import { Link } from "react-router-dom";
import SearchBar from "../components/Header/SearchBar";
import UserButton from "../components/Header/UserButton";
import HiddenMenu from "../components/Header/HiddenMenu";
import styled from "styled-components";
import Logo from "../assets/logo";
import MenuIcon from "../assets/menu-icon";
import { useState } from "react";
// import "./Header.css";

const Component = styled.div`
  display: flex;
  position: sticky;
  top: 0px;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  height: 56px;
  align-items: center;
  margin-bottom: 15px;
  justify-content: space-around;
  width: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin: 0 30px;
  gap: 10px;
  @media only screen and (max-width: 540px) {
    position: relative;
  }
  @media only screen and (max-width: 970px) {
    margin: 0 10px;
  }
`;
const MenuButton = styled.button`
  display: none;
  background-color: transparent;
  color: #fff;
  border-radius: 50%;
  border: none;
  z-index: 1001;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #303030;
  }
  @media only screen and (max-width: 970px) {
    display: flex;
  }
  @media only screen and (max-width: 540px) {
    display: flex;
  }
`;
const LogoDiv = styled.div`
  margin-left: 0px;
  display: flex;
  svg {
    z-index: 2000;
    height: 30px;
    width: 180px;
  }
  @media only screen and (max-width: 540px) {
    margin: 0 auto;
  }
`;
const Menu = styled.div`
  margin: 0 25px;

  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    padding: 0;
  }
  & li {
    display: inline-flex;
    flex-wrap: nowrap;
    flex-direction: row;
    flex-shrink: 0;
  }
  & li a {
    text-decoration: none;
    color: gray;
  }
  & li a:hover {
    text-decoration: none;
    color: white;
  }

  @media only screen and (max-width: 970px) {
    display: none;
    width: 100%;
    margin: 0;
  }
  @media only screen and (max-width: 540px) {
    position: absolute;
    top: 45px;
    left: -35px;
    /* display:flex; */
    opacity: 0.8;
    background-color: #000;
    padding: 10px 20px;
    ul {
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }
  }
`;

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const toogleMenu = () => {
    setShowMenu(!showMenu);
  };
  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <Component>
      <Wrapper>
        <MenuButton onClick={toogleMenu}>{MenuIcon}</MenuButton>
        <HiddenMenu show={showMenu} toogle={toogleMenu} close={closeMenu} />
        <Link onClick={closeMenu} to="/">
          <LogoDiv>{Logo}</LogoDiv>
        </Link>
        <Menu>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Releases</Link>
            </li>
            <li>
              <Link to="/coming-soon">Coming Soon</Link>
            </li>
            <li>
              <Link to="/services">On Services</Link>
            </li>
            <li>
              <Link to="/calendar">My calendar</Link>
            </li>
          </ul>
        </Menu>
        <SearchBar />
        <UserButton />
      </Wrapper>
    </Component>
  );
}
