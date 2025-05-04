interface CustomErrorProps {
	name: string;
	message: string;
	statusCode: number;
	stack?: string;
	cause?: unknown;
	client: string;
}

class CustomError extends Error {
	public readonly statusCode: number;
	public readonly timestamp: string;
	public readonly client: string;

	constructor({ name, message, statusCode, stack, cause, client }: CustomErrorProps) {
		super(message, cause ? { cause } : undefined);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = name;
		this.statusCode = statusCode;
		this.timestamp = new Date().toISOString();
		if (stack) this.stack = stack;
		this.client = client;

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
			client: this.client
		};
	}

	public log(): void {
		console.error(JSON.stringify(this.toJSON(), null, 2));
	}
}

export default CustomError;
