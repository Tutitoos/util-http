import { AxiosError } from "axios";
import CustomError from "../CustomError";
import AxiosClient from "./AxiosClient";
import FetchClient from "./FetchClient";
import UndiciClient from "./UndiciClient";

class HttpClient {
	private static _instance: HttpClient;

	public axios: AxiosClient;
	public fetch: FetchClient;
	public undici: UndiciClient;

	constructor() {
		this.axios = new AxiosClient();
		this.fetch = new FetchClient();
		this.undici = new UndiciClient();
	}

	public static getInstance(): HttpClient {
		HttpClient._instance ||= new HttpClient();

		return HttpClient._instance;
	}

	public static handleErrors(error: unknown, client: string): CustomError {
		let { message = "An unknown error occurred", name, cause, stack } = error as Error;
		let statusCode = 500;
		if (error instanceof AxiosError) {
			const { response } = error;

			statusCode = response?.status || 500;
			if (typeof response?.data === "object") {
				message = response?.data?.errors?.[0]?.message || response?.data?.error?.message || response?.data?.message;
			} else if (typeof response?.data === "string") {
				const trimmedData = response.data.trim();
				const errorText = trimmedData.length > 0 ? trimmedData : response.statusText;
				message = errorText;
			}
		}

		if (typeof message === "string" && (message.includes("<!DOCTYPE html>") || message.includes("ECONNREFUSED"))) {
			message = "Unavailable Service";
			statusCode = 503;
		}

		if (!message || message.includes("ENOTFOUND")) {
			message = "Resource Not Found";
			statusCode = 404;
		}

		return new CustomError({
			client,
			message,
			statusCode,
			name,
			cause,
			stack
		});
	}
}

export default HttpClient;
