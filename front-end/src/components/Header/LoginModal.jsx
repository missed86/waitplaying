import { useContext, useEffect, useRef, useState } from "react";
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
	top: 50%;
	left: 50%;
	visibility: hidden;
	transition: all 0.3s ease-in-out;
	transform: translate(-50%, -60%);
	z-index: 99999;
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

	padding: 0 10px;
	height: 40px;
	background-color: #202020;
	color: #fff;
	&::placeholder {
		color: gray;
	}
	border: ${(props) =>
		props.error ? `1px solid #992121;` : `1px solid #505050;`};
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
	const {
		loginUser,
		showLoginWindow,
		loginWindow,
		registerUser,
		registerData,
		loginError,
	} = useContext(AuthContext);
	const registerRef = useRef();
	const inputRef = useRef();
	const [register, setRegister] = useState(false);
	const [validationError, setValidationError] = useState({
		username: false,
		email: false,
		password: false,
		repeatpassword: false,
	});
	const [errorMessages, setErrorMessages] = useState([]);

	useEffect(() => {
		if (loginWindow) {
			setTimeout(() => {
				if (inputRef.current) {
					inputRef.current.focus();
				}
			}, 100);
		}
	}, [loginWindow]);

	const clkBackground = (e) => {
		showLoginWindow(false);
	};
	const clkClose = () => {
		showLoginWindow(false);
	};
	// useEffect(() => {
	// 	if(registerData?.error) {
	// 		switch(registerData.error) {
	// 			case 'email':
	// 				document.querySelector('input[name="email"]').setCustomValidity(registerData.error.email);
	// 				break;
	// 			case 'password':
	// 				document.querySelector('input[name="password"]').setCustomValidity(registerData.error.password);
	// 				break;
	// 			case 'name':
	// 				document.querySelector('input[name="username"]').setCustomValidity(registerData.error.username);
	// 				break;
	// 			default:
	// 				break;
	// 		}
	// 	}
	// },[registerData])

	useEffect(() => {
		if (register) {
			registerRef.current.reset();
		} else {
			setTimeout(() => {
				if (inputRef.current) {
					inputRef.current.focus();
				}
			}, 100);
		}
	}, [register]);

	const validateRegisterUser = (e) => {
		e.preventDefault();
		let error = false;
		setErrorMessages([]);
		const messages = [];

		const fields = {
			username: e.target.username,
			email: e.target.email,
			password: e.target.password,
			repeatpassword: e.target.repeatpassword,
		};

		const fieldNames = {
			username: "Username",
			email: "Email",
			password: "Password",
			repeatpassword: "Repeat Password",
		};

		const validationErrors = {
			username: false,
			email: false,
			password: false,
			repeatpassword: false,
		};
		for (const field in fields) {
			if (fields[field].value.trim() === "") {
				error = true;
				validationErrors[field] = "Required field";
				messages.push(fieldNames[field] + ": Required field");
			} else {
				validationErrors[field] = false;
			}
		}

		if (
			fields.password.value !== fields.repeatpassword.value &&
			fields.password.value.trim() != "" &&
			fields.repeatpassword.value.trim() != ""
		) {
			error = true;
			validationErrors.password = "Passwords must match";
			validationErrors.repeatpassword = "Passwords must match";
			messages.push("Passwords must match");
		}
		if (
			fields.password.value.length < 8 &&
			fields.password.value.trim() != "" &&
			fields.repeatpassword.value.trim() != ""
		) {
			error = true;
			validationErrors.password = "Password must be at least 8 characters";
			messages.push("Password must be at least 8 characters");
		}
		setValidationError(validationErrors);
		setErrorMessages(errorMessages);
		if (!error) {
			registerUser(e);
		}
	};
	useEffect(() => {
		if (registerData?.error) {
			const messages = [];
			for (const error in registerData.error) {
				messages.push(registerData.error[error]);
			}
			setErrorMessages(messages);
		} else {
			setErrorMessages([]);
		}
	}, [registerData]);

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
					{!register ? (
						<Form onSubmit={loginUser}>
							<h2>Sign in</h2>
							<FormGroup>
								<label htmlFor="username">Your username o email</label>
								<Input
									type="text"
									name="username"
									placeholder="username"
									ref={inputRef}
								/>
							</FormGroup>
							<FormGroup>
								<label htmlFor="password">Your password</label>
								<Input type="password" name="password" placeholder="••••••••" />
							</FormGroup>
							<div>
								<ul>{loginError && <li>{loginError}</li>}</ul>
							</div>
							<LoginButton type="submit">Login</LoginButton>
							<div>
								Not registered?{" "}
								<a onClick={() => setRegister(true)} href="#">
									Create account
								</a>
							</div>
						</Form>
					) : (
						<Form onSubmit={validateRegisterUser} ref={registerRef}>
							<h2>Register</h2>
							<FormGroup>
								<label htmlFor="username">Your username</label>
								<Input
									error={
										validationError.username
											? validationError.username
											: registerData.error?.username &&
											  registerData.error.username[0]
									}
									type="text"
									name="username"
									placeholder="username"
								/>
							</FormGroup>
							<FormGroup>
								<label htmlFor="email">Your email</label>
								<Input
									error={
										validationError.email
											? validationError.email
											: registerData.error?.email && registerData.error.email[0]
									}
									type="email"
									name="email"
									placeholder="email"
								/>
							</FormGroup>
							<FormGroup>
								<label htmlFor="password">Your password</label>
								<Input
									error={
										validationError.password
											? validationError.password
											: registerData.error?.password &&
											  registerData.error.password[0]
									}
									type="password"
									name="password"
									placeholder="••••••••"
								/>
							</FormGroup>
							<FormGroup>
								<label htmlFor="repeatpassword">Repeat your password</label>
								<Input
									error={
										validationError.repeatpassword
											? validationError.repeatpassword
											: registerData.error?.password &&
											  registerData.error.password[0]
									}
									type="password"
									name="repeatpassword"
									placeholder="••••••••"
								/>
							</FormGroup>
							<div>
								<ul>
									{errorMessages &&
										errorMessages.map((error, index) => {
											return <li key={"Error" + index}>{error}</li>;
										})}
								</ul>
							</div>
							<LoginButton type="submit">Register</LoginButton>
							<div>
								Already registered?{" "}
								<a onClick={() => setRegister(false)} href="#">
									Sign in
								</a>
							</div>
						</Form>
					)}
				</Content>
			</Modal>
			<Background className={loginWindow && "show"} onClick={clkBackground} />
		</>
	);
}
