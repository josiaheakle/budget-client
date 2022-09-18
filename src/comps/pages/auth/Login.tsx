import * as React from "react"
import { useNavigate } from "react-router-dom"

import { Form, useInputValue } from "jwe-react-form"

import { UserHandler } from "../../../modules/UserHandler"

import * as css from "./Login.module.css"
import { SwitchInput } from "../../inputs/SwitchInput"
import { TextInput } from "../../inputs/TextInput"
import { Button } from "../../inputs/Button"

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
	const nav = useNavigate()

	const [isNewUser, setIsNewUser] = React.useState(false)

	const [email, onEmailChange] = React.useState<string>()
	const [password, onPasswordChange] = React.useState<string>()
	const [firstName, onFirstNameChange] = React.useState<string>()
	const [lastName, onLastNameChange] = React.useState<string>()

	const userLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		if (email && password) {
			const user = await UserHandler.loginUser(email, password)
			if (user) nav("/")
		}
	}

	const userRegister = async (e: React.FormEvent) => {
		e.preventDefault()
		if (email && password && firstName && lastName) {
			const user = await UserHandler.registerUser(email, password, firstName, lastName)
			if (user) nav("/")
		}
	}

	const onSwitchChange = (value: string | number) => {
		setIsNewUser(!!Number(value))
	}

	return (
		<main className="page flex-center">
			<div className={`${css.Login}`}>
				<div className="heading-container">
					<h1 className={`${css.Heading}`}>{isNewUser ? "Register" : "Login"}</h1>
					<SwitchInput
						options={{
							0: "Login",
							1: "Register",
						}}
						onSwitchChange={onSwitchChange}
					/>
				</div>
				<Form onSubmit={(e) => (isNewUser ? userRegister(e) : userLogin(e))} hideSubmit>
					{isNewUser ? (
						<div>
							<TextInput
								id="first-name-input"
								label="First Name"
								onInputChange={onFirstNameChange}
							/>
							<TextInput id="last-name-input" label="Last Name" onInputChange={onLastNameChange} />
						</div>
					) : null}
					<TextInput id="email-input" label="Username" onInputChange={onEmailChange} />
					<TextInput
						id="password-input"
						label="Password"
						type="password"
						onInputChange={onPasswordChange}
					/>
					<Button>Submit</Button>
				</Form>
			</div>
		</main>
	)
}
