#!/usr/bin/env node

import Constants from "./Constants";
import CustomError from "./CustomError";
import * as utilHttp from "./clients/index";

export default utilHttp;
export * from "./clients/index";
export { CustomError, Constants };

// new utilHttp.AxiosClient()
// 	.get({ url: "https://api.example.com/data" })
// 	.then((response) => console.log("Response:", response))
// 	.catch((error) => console.error("Error:", error));

// new utilHttp.AxiosClient()
// 	.get<Record<string, string>>({ url: "https://pokeapi.co/api/v2/" })
// 	.then((response) => console.log("Response:", response))
// 	.catch((error) => console.error("Error:", error));

// new utilHttp.FetchClient()
// 	.post<Record<string, string>>({ url: "https://pokeapi.co/api/v2/", data: { name: "pikachu" } })
// 	.then((response) => console.log("Response:", response))
// 	.catch((error) => console.error("Error:", error));
