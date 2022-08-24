import React from "react";
import { toast } from "react-hot-toast";

import { ServerResponse } from "../../../../shared/types/ServerResponse";

/**
 * Runs easy fetch, calling react hot toast for success or error depending on isValid within server response
 * @param route route to append at the end of api url
 * @param init init data to apply to fetch
 * @returns JSON data or Error object
 */
export const toastFetch = async (
	route: RequestInfo | URL,
	init?: RequestInit
): Promise<ServerResponse> => {
	const data = await easyFetch(route, init);
	if (data.isValid) toast.success(data.message);
	else toast.error(data.message);
	return data;
};

/**
 * Runs fetch at API URL defined within .env, appends route and applies init.
 * ---
 * @param route route to append at the end of api url
 * @param init init data to apply to fetch
 * @returns JSON data or Error object
 */
const easyFetch = async (route: RequestInfo | URL, init?: RequestInit): Promise<ServerResponse> => {
	const res = await fetch(`${import.meta.env.VITE_API_URL}${route}`, init);
	const data = await res.json();
	return data;
};

/**
 * Create a function using easy fetch to use with form on submit
 * ---
 * @param route route to append at the end of api url
 * @param init init data to apply to fetch
 * @param postSubmit callback with ServerResponse object
 * @returns function to apply to form on submit property; prevents page refresh and fetches using easy fetch
 */
const formFetch = (
	route: RequestInfo | URL,
	init?: RequestInit,
	postSubmit?: (data: ServerResponse) => void
) => {
	return async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = await easyFetch(route, init);
		if (postSubmit) postSubmit(data);
	};
};

export { easyFetch, formFetch };
