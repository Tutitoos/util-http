import { type Dispatcher, request } from "undici";
import type BodyReadable from "undici/types/readable";
import { contentTypes } from "../constants";
import type { ClientOptions, ContentTypeHandlerKey } from "../types";
import HttpClient from "./HttpClient";

class UndiciClient {
	private readonly contentHandlers: Record<ContentTypeHandlerKey, (body: BodyReadable & Dispatcher.BodyMixin) => Promise<any>> = {
		json: async (body) => body.json(),
		urlencoded: async (body) => body.formData(),
		formData: async (body) => body.formData(),
		text: async (body) => body.text(),
		buffer: async (body) => body.arrayBuffer()
	};

	public async custom<ResponseJSON>(config: ClientOptions): Promise<ResponseJSON> {
		const url = `${config.url}`;

		if (config.timeout === 0) config.timeout = 15000;

		Reflect.defineProperty(config, "body", {
			value: config.data
		});
		Reflect.deleteProperty(config, "data");
		Reflect.deleteProperty(config, "url");

		const response: Dispatcher.ResponseData = await request(url, config).catch((error: unknown) =>
			HttpClient.handleErrors(error, "undici")
		);

		if (response.statusCode !== 200) {
			throw response;
		}

		const contentTypeRaw = (response.headers["Content-Type"] || response.headers["content-type"]) as string;
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
			return (await handler(response.body)) as ResponseJSON;
		}

		throw new Error(`Unsupported Content-Type: ${contentType}`);
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

export default UndiciClient;
