import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import AuthContext from "../../context/AuthContext";

const Modal = styled.div`
	display: flex;
	background-color: #303030;
	padding: 16px;
	border: 1px solid #202020;
	border-radius: 10px;
	width: 300px;
	opacity: 0;
    position: fixed;
    top:50%;
    left:50%;
	visibility: hidden;
	transition: all 0.3s ease-in-out;
	transform: translate(-50%, -60%);
    z-index:99999;
	&.show {
		visibility: visible;
		opacity: 1;
		transition: all 0.3s ease-in-out;
		transform: translate(-50%, -50%);
	}
`;
const Background = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	visibility: hidden;
	transition: all 0.3s ease-in-out;
	position: fixed;
	content: "";
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	&.show {
		visibility: visible;
		opacity: 1;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9999;
		transition: all 0.3s ease-in-out;
	}
`;
const Content = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	margin-bottom: 10px;
	& h2 {
		margin: 0 0 15px 0;
	}
	& a {
		text-decoration: none;
		color: orangered;
	}
`;
const CloseWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
`;
const CloseButton = styled.button`
	color: #fff;
	background: none;
	border: none;
	width: 30px;
	height: 30px;
	padding: 5px;
	border-radius: 5px;
	&:hover {
		background-color: #404040;
	}
`;
const Form = styled.form`
	display: flex;
	flex-direction: column;
`;
const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
`;
const Input = styled.input`
	border-radius: 5px;
	border: 1px solid #505050;
	padding: 0 10px;
	height: 40px;
	background-color: #202020;
	color: #fff;
	&::placeholder {
		color: gray;
	}
`;
const LoginButton = styled.button`
	flex-grow: 1;
	height: 40px;
	padding: 5px 10px;
	border-radius: 5px;
	border: none;
	margin: 20px 0;
	text-align: center;
	font-weight: bold;
`;

export default function LoginModal({ actived, setActived }) {
	const { loginUser, showLoginWindow, loginWindow, registerData } = useContext(AuthContext);
    const inputRef  = useRef()
	

    useEffect(()=>{
        if(loginWindow) {
            setTimeout(()=>{
                inputRef.current.focus()
            },100)
        }
        
    }, [loginWindow])

	useEffect(() => {
		if (registerData.error) {
			console.log(registerData.error)
		}
	}, [registerData]);

	const clkBackground = (e) => {
		showLoginWindow(false);
	};
	const clkClose = () => {
		showLoginWindow(false);
	};
	return (
		<>
			
				<Modal className={loginWindow && "show"}>
					<Content>
						<CloseWrapper>
							<CloseButton onClick={clkClose}>
								<svg
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</CloseButton>
						</CloseWrapper>
						<Form onSubmit={loginUser}>
							<h2>Sign in</h2>
							<FormGroup>
								<label htmlFor="username">Your username</label>
								<Input type="text" name="username" placeholder="username" ref={inputRef}/>
							</FormGroup>
							<FormGroup>
								<label htmlFor="password">Your password</label>
								<Input type="password" name="password" placeholder="••••••••" />
							</FormGroup>
							<LoginButton type="submit">Login</LoginButton>
							<div>
								Not registered? <a href="#">Create account</a>
							</div>
						</Form>
					</Content>
				</Modal>
                <Background className={loginWindow && "show"} onClick={clkBackground}/>
		</>
	);
}
