import axios, { AxiosError } from "axios";
import type { ClientOptions } from "../types";

class AxiosClient {
	public async custom<ResponseJSON>(options: ClientOptions): Promise<ResponseJSON> {
		if (options.timeout === 0) options.timeout = 15000;

		return axios<ResponseJSON>(options)
			.then((response) => response.data)
			.catch((error: unknown) => {
				let { message = "An unknown error occurred" } = error as Error;
				if (error instanceof AxiosError) {
					const { response } = error;

					if (typeof response?.data === "object") {
						message = response?.data?.errors?.[0]?.message || response?.data?.error?.message || response?.data?.message;
					} else if (typeof response?.data === "string") {
						const trimmedData = response.data.trim();
						const errorText = trimmedData.length > 0 ? trimmedData : response.statusText;

						message = errorText;
					}
				}

				throw new Error(message);
			});
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
