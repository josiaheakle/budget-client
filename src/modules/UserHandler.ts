import { User } from "src/types/User";
import { toastFetch, easyFetch } from "./util/FetchUtil";
import { ServerResponse } from "../../../shared/types/ServerResponse";

/**
 * Core for all requests that require user data.
 */
abstract class UserHandler {
	protected static user: User;
	protected static jwt: string;

	/**
	 * Gets user from self or tries to retrieve from server.
	 * Does not handle any errors.
	 */
	public static async getUser() {
		if (!UserHandler.user) await UserHandler.getUserFromServer();
		return UserHandler.user;
	}

	/**
	 * Uses saved JWT to retrieve user data from server and save it internally
	 * NOTE: Does not return user
	 */
	private static async getUserFromServer() {
		const reqInit = UserHandler.createRequestInit({
			method: "GET",
			mode: "cors",
		});
		try {
			const data = await easyFetch("/auth/user", reqInit);
			if (data.isValid) UserHandler.user = data.data as User;
		} catch (error) {
			throw { msg: "Cannot retrieve user data from server", error };
		}
	}

	/**
	 * Requests login from server using email & password, calling toast fetch.
	 * Applies JWT to User Handler to use in createRequestInit.
	 * ---
	 * @param email user's email
	 * @param password user's password
	 */
	public static async loginUser(email: string, password: string): Promise<User | false> {
		const data = await toastFetch("/auth/login", {
			method: "post",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});
		if (data.isValid) {
			localStorage.setItem("jwt", data.data.jwt);
			UserHandler.jwt = data.data.jwt;
			await UserHandler.getUserFromServer();
			return UserHandler.user;
		} else return false;
	}

	/**
	 * Creates request init object to use with fetch applying JWT as auth
	 * ---
	 * @param init fetch RequestInit object to apply headers to
	 */
	public static createRequestInit(init?: RequestInit): RequestInit {
		if (!UserHandler.jwt) throw `No JWT in UserHandler to create request init.`;
		const headers: HeadersInit = {
			Authorization: `Bearer ${UserHandler.jwt}`,
		};
		return { ...init, headers };
	}
}

export { UserHandler };
