import { contentTypes } from "../constants";
import type { ClientOptions, ContentTypeHandlerKey } from "../types";
import HttpClient from "./HttpClient";

class FetchClient {
	private static _instance: FetchClient;
	private readonly contentHandlers: Record<ContentTypeHandlerKey, (body: Response) => Promise<any>> = {
		json: async (body) => body.json(),
		urlencoded: async (body) => body.formData(),
		formData: async (body) => body.formData(),
		text: async (body) => body.text(),
		buffer: async (body) => body.arrayBuffer()
	};

	public static getInstance(): FetchClient {
		FetchClient._instance ||= new FetchClient();

		return FetchClient._instance;
	}

	private async custom<ResponseJSON>(config: ClientOptions): Promise<ResponseJSON> {
		const url = `${config.url}`;

		if (config.timeout === 0) config.timeout = 15000;

		Reflect.defineProperty(config, "body", {
			value: config.data
		});
		Reflect.deleteProperty(config, "data");
		Reflect.deleteProperty(config, "url");

		return fetch(url, config)
			.then(async (response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}

				const contentTypeRaw = (response.headers.get("Content-Type") || response.headers.get("content-type"))!;
				if (!contentTypeRaw) {
					throw new Error("No Content-Type header");
				}

				const contentType = contentTypeRaw.split(";")[0];
				if (!contentType) {
					throw new Error("No Content-Type header");
				}

				const handlerKey = contentTypes[contentType];
				if (handlerKey) {
					const handler = this.contentHandlers[handlerKey];
					return (await handler(response)) as ResponseJSON;
				}

				throw new Error(`Unsupported Content-Type: ${contentType}`);
			})
			.catch((error: unknown) => HttpClient.handleErrors(error, "fetch"));
	}

	public async get<ResponseJSON>(config: Omit<ClientOptions, "method">): Promise<ResponseJSON> {
		return this.custom<ResponseJSON>({
			...config,
			method: "GET"
		});
	}

	public async post<ResponseJSON>(config: Omit<ClientOptions, "method">): Promise<ResponseJSON> {
		return this.custom<ResponseJSON>({
			...config,
			method: "POST"
		});
	}

	async patch<ResponseJSON>(config: Omit<ClientOptions, "method">): Promise<ResponseJSON> {
		return this.custom<ResponseJSON>({
			...config,
			method: "PATCH"
		});
	}

	public async put<ResponseJSON>(config: Omit<ClientOptions, "method">): Promise<ResponseJSON> {
		return this.custom<ResponseJSON>({
			...config,
			method: "PUT"
		});
	}

	public async delete<ResponseJSON>(config: Omit<ClientOptions, "method">): Promise<ResponseJSON> {
		return this.custom<ResponseJSON>({
			...config,
			method: "DELETE"
		});
	}
}

export default FetchClient;
