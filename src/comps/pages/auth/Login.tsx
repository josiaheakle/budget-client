import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Form, TextInput, useInputValue } from "jwe-react-form";

import { UserHandler } from "../../../modules/UserHandler";

import * as css from "./Login.module.css";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
	const nav = useNavigate();

	const [isNewUser, setIsNewUser] = React.useState(false);

	const [email, onEmailChange] = useInputValue();
	const [password, onPasswordChange] = useInputValue();

	const [firstName, onFirstNameChange] = useInputValue();
	const [lastName, onLastNameChange] = useInputValue();

	const userLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		if (email && password) {
			const user = await UserHandler.loginUser(email, password);
			if (user) nav("/");
		}
	};

	const userRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		if (email && password && firstName && lastName) {
			console.log("REGISTER USER!");
		}
	};

	React.useEffect(() => {
		console.log({ email, password });
	}, [email, password]);

	return (
		<main className="page flex-center">
			<div className={`${css.Login}`}>
				<h1 className={`${css.Heading}`}>{isNewUser ? "Register" : "Login"}</h1>
				<Form onSubmit={userLogin}>
					{isNewUser ? (
						<div>
							<TextInput id="first-name-input" label="First Name" onChange={onFirstNameChange} />
							<TextInput id="last-name-input" label="Last Name" onChange={onLastNameChange} />
						</div>
					) : null}
					<TextInput id="email-input" label="Username" onChange={onEmailChange} />
					<TextInput
						id="password-input"
						label="Password"
						type="password"
						onChange={onPasswordChange}
					/>
				</Form>
				<a
					href="#"
					onClick={(e) => {
						e.preventDefault();
						setIsNewUser(!isNewUser);
					}}
				>
					{isNewUser ? "Create New Account" : "Login with Existing Account"}
				</a>
			</div>
		</main>
	);
};
