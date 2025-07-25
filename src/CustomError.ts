interface CustomErrorProps {
	name: string;
	message: string;
	statusCode: number;
	stack?: string;
	cause?: unknown;
	client: string;
	extra?: Record<string, unknown>;
}

class CustomError extends Error {
	public readonly statusCode: number;
	public readonly timestamp: string;
	public readonly client: string;
	public readonly extra?: Record<string, unknown>;

	constructor({ name, message, statusCode, stack, cause, client, extra }: CustomErrorProps) {
		super(message, cause ? { cause } : undefined);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = name;
		this.statusCode = statusCode;
		this.timestamp = new Date().toISOString();
		if (stack) this.stack = stack;
		this.client = client;
		if (extra) this.extra = extra;

		Error.captureStackTrace(this, this.constructor);
	}

	public toJSON() {
		return {
			name: this.name,
			message: this.message,
			statusCode: this.statusCode,
			timestamp: this.timestamp,
			stack: this.stack,
			cause: this.cause,
			client: this.client,
			...(this.extra ? { extra: this.extra } : {})
		};
	}

	public log(): void {
		console.error(JSON.stringify(this.toJSON(), null, 2));
	}
}

export default CustomError;
