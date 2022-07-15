import React from "react";

import { ServerResponse } from "@backend/types/ServerResponse";

const easyFetch = async (route: RequestInfo | URL, init?: RequestInit) => {
	try {
		const res = await fetch(`${import.meta.env.VITE_API_URL}${route}`, init);
		const data = await res.json();
		return data;
	} catch (err) {
		return err;
	}
};

const formFetch = (
	route: RequestInfo | URL,
	init?: RequestInit,
	postSubmit?: (data?: ServerResponse) => void
) => {
	return async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = await easyFetch(route, init);
		if (postSubmit) postSubmit(data);
	};
};

export { easyFetch, formFetch };
