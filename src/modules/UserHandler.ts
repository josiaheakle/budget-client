import { User } from "../../../shared/types/ClientModels"
import { Data } from "../../../shared/types/ServerResponse"
import { toastFetch, easyFetch } from "./util/FetchUtil"

/**
 * Core for all requests that require user data.
 */
abstract class UserHandler {
	protected static user: User | undefined
	protected static jwt: string

	public static refreshJWT() {
		const jwt = localStorage.getItem("jwt")
		if (jwt) UserHandler.jwt = jwt
	}

	/**
	 * Gets user from self or tries to retrieve from server.
	 * Does not handle any errors.
	 */
	public static async getUser() {
		if (!UserHandler.user) {
			await UserHandler.getUserFromServer()
		}
		return UserHandler.user
	}

	/**
	 * Uses saved JWT to retrieve user data from server and save it internally
	 * NOTE: Does not return user
	 */
	private static async getUserFromServer() {
		this.refreshJWT()
		if (this.jwt) {
			const reqInit = UserHandler.createRequestInit({
				method: "GET",
				mode: "cors",
			})
			try {
				const data = await easyFetch("/auth/user", reqInit)
				if (data.isValid === true) UserHandler.user = data.data as User
				if (data.isValid === false) {
					UserHandler.user = undefined
					localStorage.removeItem("jwt")
				}
			} catch (error) {
				throw { msg: "Cannot retrieve user data from server", error }
			}
		} else {
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
		})
		if (data.isValid) {
			localStorage.setItem("jwt", (data.data as Data).jwt)
			UserHandler.jwt = (data.data as Data).jwt
			await UserHandler.getUserFromServer()
			return UserHandler.user || false
		} else return false
	}

	public static async registerUser(
		email: string,
		password: string,
		firstName: string,
		lastName: string
	) {
		const data = await toastFetch("/auth/register", {
			method: "post",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ email, password, firstName, lastName }),
		})
		if (data.isValid) {
			localStorage.setItem("jwt", (data.data as Data).jwt)
			UserHandler.jwt = (data.data as Data).jwt
			await UserHandler.getUserFromServer()
			return UserHandler.user
		} else return false
	}

	/**
	 * Creates request init object to use with fetch applying JWT as auth
	 * ---
	 * @param init fetch RequestInit object to apply headers to
	 */
	public static createRequestInit(init?: RequestInit): RequestInit {
		if (!UserHandler.jwt) {
			this.refreshJWT()
		}
		let headers: HeadersInit
		if (UserHandler.jwt) {
			headers = {
				Authorization: `Bearer ${UserHandler.jwt}`,
				"Content-Type": "application/json",
			}
		} else {
			headers = {}
		}
		return { ...init, headers }
	}
}

export { UserHandler }
