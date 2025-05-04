import type { ContentTypeHandlerKey } from "./types";

export const contentTypes: Record<string, ContentTypeHandlerKey> = {
	// Binary / streams
	"application/octet-stream": "buffer",

	// JSON
	"application/json": "json",

	// Form data
	"application/x-www-form-urlencoded": "urlencoded",
	"multipart/form-data": "formData",

	// Text
	"text/plain": "text",
	"text/html": "text",
	"text/xml": "text",
	"application/xml": "text",

	// Audio
	"audio/mpeg": "buffer",
	"audio/mp3": "buffer",
	"audio/wav": "buffer",
	"audio/x-wav": "buffer",
	"audio/ogg": "buffer",
	"audio/webm": "buffer",
	"audio/aac": "buffer",
	"audio/flac": "buffer",

	// Video
	"video/mpeg": "buffer",
	"video/mp4": "buffer",
	"video/ogg": "buffer",
	"video/webm": "buffer",
	"video/x-msvideo": "buffer", // AVI

	// Images
	"image/png": "buffer",
	"image/jpeg": "buffer",
	"image/jpg": "buffer",
	"image/gif": "buffer",
	"image/webp": "buffer",
	"image/svg+xml": "text",
	"image/bmp": "buffer",
	"image/x-icon": "buffer",

	// Documentos y archivos
	"application/pdf": "buffer",
	"application/zip": "buffer",
	"application/x-rar-compressed": "buffer",
	"text/csv": "text",
	"application/vnd.ms-excel": "buffer",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "buffer",
	"application/vnd.ms-powerpoint": "buffer",
	"application/vnd.openxmlformats-officedocument.presentationml.presentation": "buffer",
	"application/msword": "buffer",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document": "buffer"
};

export default {
	contentTypes
};
