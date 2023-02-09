import styled from "styled-components"

const Drawer = styled.div`
    position: fixed;
    height: 100%;
    width: 270px;
    background-color: #101010;
    left:calc(-100%);
    top: 0;
    z-index: 1000;
    transition: all 0.3s ease-in-out;
    ${'' /* box-shadow: 100px 0 100px #00000080; */}
    &.show {
        left:0;
        transition: all 0.3s ease-in-out;
    }
    @media only screen and (max-width:540px) {
        width:100%;
        left: calc(-100%)
    }
`
const Background = styled.div`
    visibility: hidden;
    position:fixed;
    width:100%;
    height:100%;
    z-index:900;
    left:0;
    top:0;
    background-color: #00000070;
    opacity:0;
    transition: all 0.3s ease-in-out;
    &.show {
        visibility: visible;
        opacity: 1;
        transition: all 0.3s ease-in-out;
    }
`

export default function HiddenMenu({show, toogle, close}) {
    return (
    <>
    <Background onClick={close} className={show?"show":""}/>
    <Drawer className={show?"show":""}/>
    </>
    )
}