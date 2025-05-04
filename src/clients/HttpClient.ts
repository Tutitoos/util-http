import AxiosClient from "./AxiosClient";
import FetchClient from "./FetchClient";
import UndiciClient from "./UndiciClient";

class HttpClient {
	private static _instance: HttpClient;

	public axios: AxiosClient;
	public fetch: FetchClient;
	public undici: UndiciClient;

	constructor() {
		this.axios = new AxiosClient();
		this.fetch = new FetchClient();
		this.undici = new UndiciClient();
	}

	public static getInstance(): HttpClient {
		HttpClient._instance ||= new HttpClient();

		return HttpClient._instance;
	}
}

export default HttpClient;
