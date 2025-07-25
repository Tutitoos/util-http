import { type Dispatcher, request } from "undici";
import type BodyReadable from "undici/types/readable";
import { contentTypes } from "../Constants";
import type { ClientOptions, ContentTypeHandlerKey } from "../types";
import HttpClient from "./HttpClient";

class UndiciClient {
	private static _instance: UndiciClient;
	private readonly contentHandlers: Record<ContentTypeHandlerKey, (body: BodyReadable & Dispatcher.BodyMixin) => Promise<any>> = {
		json: async (body) => body.json(),
		urlencoded: async (body) => body.formData(),
		formData: async (body) => body.formData(),
		text: async (body) => body.text(),
		buffer: async (body) => body.arrayBuffer()
	};

	public static getInstance(): UndiciClient {
		UndiciClient._instance ||= new UndiciClient();

		return UndiciClient._instance;
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

		const response: Dispatcher.ResponseData = await request(url, newConfig).catch((error: unknown) => {
			throw HttpClient.handleErrors(error, 500, "undici");
		});

		const contentTypeRaw = (response.headers["Content-Type"] || response.headers["content-type"]) as string;
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

		if (response.statusCode < 200 || response.statusCode > 299) {
			const errorData = (await response.body.json()) as Record<string, unknown>;
			throw HttpClient.handleErrors(errorData, response.statusCode, "undici");
		}

		const handler = this.contentHandlers[handlerKey];
		return (await handler(response.body)) as Response;
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

export default UndiciClient;
