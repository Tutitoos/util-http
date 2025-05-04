export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ClientOptions {
	url: string;
	method: Method;
	headers?: Record<string, string>;
	data?: string | FormData | URLSearchParams | any;
	timeout?: number;
}

export type ContentTypeHandlerKey = "json" | "urlencoded" | "formData" | "text" | "buffer";
