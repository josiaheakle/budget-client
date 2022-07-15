import * as React from "react";
import { Form, TextInput, useInputValue } from "jwe-react-form";

import { formFetch } from "../../../util/FetchUtil";

import { ServerResponse } from "@backend/types/ServerResponse";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
	const [email, onEmailChange] = useInputValue();
	const [password, onPasswordChange] = useInputValue();

	const postSubmit = (data: ServerResponse) => {};

	return (
		<Form
			onSubmit={formFetch("/auth/login", {
				method: "post",
				body: JSON.stringify({
					email,
					password,
				}),
			})}
		>
			<TextInput id="email" label="Username" onChange={onEmailChange} />
			<TextInput
				id="password"
				label="Password"
				//@ts-ignore
				type="password"
				onChange={onPasswordChange}
			/>
		</Form>
	);
};
