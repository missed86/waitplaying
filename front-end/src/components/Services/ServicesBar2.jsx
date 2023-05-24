import styled from "styled-components"


const Component = styled.div`
    height: 50px;
    background-color: #222;
    display: flex;
    border-radius: 5px;
    border: 1px solid #2A2A2A;
    padding: 0 10px;
    align-items: center;
`


export default function ServicesBar() { 
    return (
        <Component>
            {'Gamepass PC - Gamepass Console - Playstation Premium'}
        </Component>
    )
}