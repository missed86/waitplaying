import styled from "styled-components";

const Component = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
`
const ErrorNumber = styled.div`
    font-size: 16vh;
    font-style: italic;
    font-weight: bold;
`
const ErrorText = styled.div`
    font-size: 3vh;
`

export default function Error404({what}) {
    return (
        <Component>
            <ErrorNumber>404</ErrorNumber>
            <ErrorText>{
                what == 'page' ? 'Page Not Found' :'Game Not Found'
                }</ErrorText>
        </Component>
    );
}