// import './UserButton.css'

import styled from "styled-components"

const Component = styled.div`
    width: 35px;
    height: 35px;
`
const Avatar = styled.img`
    overflow: hidden;
    border-radius: 50%;
    object-fit: fill;
    width: 35px;
    height: 35px;
`

export default function UserButton() {
    return (
        <Component>
            <Avatar src="/assets/default_user.png" alt="default_user"/>
        </Component>
    )
}
