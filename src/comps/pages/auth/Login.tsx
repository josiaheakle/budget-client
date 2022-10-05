import * as React from "react"
import { useNavigate } from "react-router-dom"

import { UserHandler } from "../../../modules/UserHandler"

import * as css from "./Login.module.css"
import { SwitchInput, TextInput, Button } from "../../inputs"
import { RequestErrors } from "../../../../../shared/types/ServerResponse"

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
	const nav = useNavigate()

	const [isNewUser, setIsNewUser] = React.useState(false)

	const [email, onEmailChange] = React.useState<string>()
	const [password, onPasswordChange] = React.useState<string>()
	const [firstName, onFirstNameChange] = React.useState<string>()
	const [lastName, onLastNameChange] = React.useState<string>()

	const [errors, setErrors] = React.useState<RequestErrors>()

	const userLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		if (email && password) {
			const user = await UserHandler.loginUser(email, password)
			if (user) {
				console.log("should nav")
				nav("/")
				console.log("done nav")
			}
		} else {
			setErrors({
				email: ["Required."],
				password: ["Required."],
			})
		}
	}

	const userRegister = async (e: React.FormEvent) => {
		e.preventDefault()
		if (email && password && firstName && lastName) {
			const user = await UserHandler.registerUser(email, password, firstName, lastName)
			if (user) {
				console.log("should nav")
				nav("/")
			}
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
				<form onSubmit={(e) => (isNewUser ? userRegister(e) : userLogin(e))}>
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
					<TextInput
						id="email-input"
						label="Username"
						errors={errors?.email}
						onInputChange={onEmailChange}
					/>
					<TextInput
						id="password-input"
						label="Password"
						type="password"
						errors={errors?.password}
						onInputChange={onPasswordChange}
					/>
					<Button>Submit</Button>
				</form>
			</div>
		</main>
	)
}
