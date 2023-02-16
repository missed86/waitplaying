// import './UserButton.css'
import {useContext, useState} from 'react'
import styled from "styled-components"
import AuthContext from "../../context/AuthContext";
import StyledLink from '../StyledLink';

const Component = styled.div`
    width: 35px;
    height: 35px;
    position: relative;
`
const Avatar = styled.img`
    overflow: hidden;
    border-radius: 50%;
    object-fit: fill;
    width: 35px;
    height: 35px;
`
const UserMenu = styled.div`
    position:absolute;
    display: flex;
    flex-direction: column;
    top: 45px;
    right: 0;
    width: 300px;
    background-color: #404040;
    border-radius: 10px;
    overflow: hidden;
`

const Header = styled.div`
    display: flex;
    flex-grow:1;
    flex-direction: row;
    padding: 10px;
    border-bottom: 1px solid #707070;
`

const AvatarWrapper = styled.div`
    padding:0 10px;
    justify-content: center;
    align-items: center;
    display:flex;
`

const UserData = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    flex:1;
`
const UserText = styled.span``
const EmailText = styled.span``

const Menu = styled.div`
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display:flex;
        li{
            display:flex;
            height:45px;
            padding: 0 10px;
            align-items: center;
            flex:1;

            &:hover {
                background-color: #505050;
            }
        }    
    }
`

export default function UserButton() {
    const {user, logoutUser} = useContext(AuthContext)
    return (
        <Component>
            <Avatar src="/assets/default_user.png" alt="default_user"/>
            {user ?
                <UserMenu>
                    <Header>
                        <AvatarWrapper><Avatar src="/assets/default_user.png" alt="default_user"/></AvatarWrapper>
                        <UserData>
                            <UserText>{user.username}</UserText>
                            <EmailText>{user.username}</EmailText>
                        </UserData>
                    </Header>
                    <Menu>
                        <ul>
                            <li onClick={logoutUser}>LOGOUT</li>
                        </ul>
                    </Menu>
                </UserMenu>
                :
                <UserMenu>
                    <Menu>
                        <ul>
                        <li><StyledLink to="/login">LOGIN</StyledLink></li>
                        </ul>
                    </Menu>
                </UserMenu>
            }
        </Component>
    )
}
