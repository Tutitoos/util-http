import axios from "axios";
import type { ClientOptions } from "../types";
import HttpClient from "./HttpClient";

class AxiosClient {
	private static _instance: AxiosClient;

	public static getInstance(): AxiosClient {
		AxiosClient._instance ||= new AxiosClient();

		return AxiosClient._instance;
	}

	private async custom<Response>(options: ClientOptions): Promise<Response> {
		if (options.timeout === 0) options.timeout = 15000;

		return axios<Response>(options)
			.then((response) => response.data)
			.catch((error: unknown) => {
				throw HttpClient.handleErrors(error, 500, "axios");
			});
	}

	public async get<Response>(options: Omit<ClientOptions, "method">): Promise<Response> {
		return this.custom<Response>({
			...options,
			method: "GET"
		});
	}

	public async post<Response>(options: Omit<ClientOptions, "method">): Promise<Response> {
		return this.custom<Response>({
			...options,
			method: "POST"
		});
	}

	public async patch<Response>(options: Omit<ClientOptions, "method">): Promise<Response> {
		return this.custom<Response>({
			...options,
			method: "PATCH"
		});
	}

	public async put<Response>(options: Omit<ClientOptions, "method">): Promise<Response> {
		return this.custom<Response>({
			...options,
			method: "PUT"
		});
	}

	public async delete<Response>(options: Omit<ClientOptions, "method">): Promise<Response> {
		return this.custom<Response>({
			...options,
			method: "DELETE"
		});
	}
}

export default AxiosClient;
