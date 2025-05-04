import axios from "axios";
import type { ClientOptions } from "../types";
import HttpClient from "./HttpClient";

class AxiosClient {
	private static _instance: AxiosClient;

	public static getInstance(): AxiosClient {
		AxiosClient._instance ||= new AxiosClient();

		return AxiosClient._instance;
	}

	private async custom<ResponseJSON>(options: ClientOptions): Promise<ResponseJSON> {
		if (options.timeout === 0) options.timeout = 15000;

		return axios<ResponseJSON>(options)
			.then((response) => response.data)
			.catch((error: unknown) => HttpClient.handleErrors(error, "axios"));
	}

	public async get<ResponseJSON>(options: Omit<ClientOptions, "method">): Promise<ResponseJSON> {
		return this.custom<ResponseJSON>({
			...options,
			method: "GET"
		});
	}

	public async post<ResponseJSON>(options: Omit<ClientOptions, "method">): Promise<ResponseJSON> {
		return this.custom<ResponseJSON>({
			...options,
			method: "POST"
		});
	}

	public async patch<ResponseJSON>(options: Omit<ClientOptions, "method">): Promise<ResponseJSON> {
		return this.custom<ResponseJSON>({
			...options,
			method: "PATCH"
		});
	}

	public async put<ResponseJSON>(options: Omit<ClientOptions, "method">): Promise<ResponseJSON> {
		return this.custom<ResponseJSON>({
			...options,
			method: "PUT"
		});
	}

	public async delete<ResponseJSON>(options: Omit<ClientOptions, "method">): Promise<ResponseJSON> {
		return this.custom<ResponseJSON>({
			...options,
			method: "DELETE"
		});
	}
}

export default AxiosClient;
