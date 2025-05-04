import type CustomError from "./CustomError";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ClientOptions {
	url: string;
	method: Method;
	headers?: Record<string, string>;
	data?: string | FormData | URLSearchParams | any;
	timeout?: number;
}

export type ContentTypeHandlerKey = "json" | "urlencoded" | "formData" | "text" | "buffer";

export type Client = "axios" | "fetch" | "undici";

declare global {
	interface Promise<T> {
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
			onrejected?: ((reason: CustomError) => TResult2 | PromiseLike<TResult2>) | undefined | null
		): Promise<TResult1 | TResult2>;

		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?: ((reason: CustomError) => TResult | PromiseLike<TResult>) | undefined | null
		): Promise<T | TResult>;
	}
}
