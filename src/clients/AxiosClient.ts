import axios from "axios";
import type { ClientOptions } from "../types";
import HttpClient from "./HttpClient";

class AxiosClient {
	public async custom<ResponseJSON>(options: ClientOptions): Promise<ResponseJSON> {
		if (options.timeout === 0) options.timeout = 15000;

		return axios<ResponseJSON>(options)
			.then((response) => response.data)
			.catch((error: unknown) => HttpClient.handleErrors(error, "axios"));
	}

	async get<ResponseJSON>(options: Omit<ClientOptions, "method">): Promise<ResponseJSON> {
		return this.custom<ResponseJSON>({
			...options,
			method: "GET"
		});
	}

	async post<ResponseJSON>(options: Omit<ClientOptions, "method">): Promise<ResponseJSON> {
		return this.custom<ResponseJSON>({
			...options,
			method: "POST"
		});
	}

	async patch<ResponseJSON>(options: Omit<ClientOptions, "method">): Promise<ResponseJSON> {
		return this.custom<ResponseJSON>({
			...options,
			method: "PATCH"
		});
	}

	async put<ResponseJSON>(options: Omit<ClientOptions, "method">): Promise<ResponseJSON> {
		return this.custom<ResponseJSON>({
			...options,
			method: "PUT"
		});
	}

	async delete<ResponseJSON>(options: Omit<ClientOptions, "method">): Promise<ResponseJSON> {
		return this.custom<ResponseJSON>({
			...options,
			method: "DELETE"
		});
	}
}

export default AxiosClient;
