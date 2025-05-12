import { contentTypes } from "../Constants";
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

	private async custom<Response>(config: ClientOptions): Promise<Response> {
		const url = `${config.url}`;

		if (config.timeout === 0) config.timeout = 15000;

		const newConfig = {
			...config,
			data: undefined,
			url: undefined,
			body: typeof config.data === "object" ? JSON.stringify(config.data) : config.data
		};

		Reflect.deleteProperty(newConfig, "data");
		Reflect.deleteProperty(newConfig, "url");

		return fetch(url, newConfig)
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
				if (!handlerKey) {
					throw new Error(`Unsupported Content-Type: ${contentType}`);
				}

				const handler = this.contentHandlers[handlerKey];
				return (await handler(response)) as Response;
			})
			.catch((error: unknown) => {
				throw HttpClient.handleErrors(error, "fetch");
			});
	}

	public async get<Response>(config: Omit<ClientOptions, "method">): Promise<Response> {
		return this.custom<Response>({
			...config,
			method: "GET"
		});
	}

	public async post<Response>(config: Omit<ClientOptions, "method">): Promise<Response> {
		return this.custom<Response>({
			...config,
			method: "POST"
		});
	}

	async patch<Response>(config: Omit<ClientOptions, "method">): Promise<Response> {
		return this.custom<Response>({
			...config,
			method: "PATCH"
		});
	}

	public async put<Response>(config: Omit<ClientOptions, "method">): Promise<Response> {
		return this.custom<Response>({
			...config,
			method: "PUT"
		});
	}

	public async delete<Response>(config: Omit<ClientOptions, "method">): Promise<Response> {
		return this.custom<Response>({
			...config,
			method: "DELETE"
		});
	}
}

export default FetchClient;
