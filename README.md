# util-http

## **_util-http es un módulo de utilidades para realizar solicitudes HTTP con diversas opciones y clientes.!_**

---

<br>
<div align="center">
<a href="https://www.npmjs.com/package/util-http">
<img src="https://img.shields.io/npm/v/util-http?label=Version&logo=npm&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/util-http">
<img alt="npm" src="https://img.shields.io/npm/dw/util-http?logo=npm&style=for-the-badge">
</a><br><a href="https://www.npmjs.com/package/util-http"><a href="https://nodei.co/npm/util-http/"><img src="https://nodei.co/npm/util-http.png?downloads=true&downloadRank=true&stars=true"></a></a><br><br>
</div>

> **⚠ ADVERTENCIA:**<br>
> Asegúrate de configurar correctamente las opciones del cliente antes de realizar solicitudes.

## Clientes disponibles

- [`AxiosClient`](#axiosclient)
- [`FetchClient`](#fetchclient)
- [`UndiciClient`](#undiciclient)
- [`HttpClient`](#httpclient)

<h2 id="ejemplo">Ejemplo</h2>

Aquí tienes un ejemplo de cómo puedes realizar solicitudes utilizando los clientes proporcionados.

```js
import { AxiosClient, FetchClient, UndiciClient, HttpClient } from "util-http";

const axiosClient = new AxiosClient();
const fetchClient = new FetchClient();
const undiciClient = new UndiciClient();
const httpClient = HttpClient.getInstance();

// Ejemplo de solicitud GET con AxiosClient
axiosClient.get({ url: "https://api.example.com/data" }).then(console.log).catch(console.error);

// Ejemplo de solicitud POST con FetchClient
fetchClient
	.post({
		url: "https://api.example.com/data",
		data: { key: "value" },
		headers: { "Content-Type": "application/json" }
	})
	.then(console.log)
	.catch(console.error);

// Ejemplo de solicitud GET con UndiciClient
undiciClient.get({ url: "https://api.example.com/data" }).then(console.log).catch(console.error);

// Ejemplo de solicitud GET con HttpClient usando Axios
httpClient.axios.get({ url: "https://api.example.com/data" }).then(console.log).catch(console.error);

// Ejemplo de solicitud POST con HttpClient usando Fetch
httpClient.fetch
	.post({
		url: "https://api.example.com/data",
		data: { key: "value" },
		headers: { "Content-Type": "application/json" }
	})
	.then(console.log)
	.catch(console.error);

// Ejemplo de solicitud GET con HttpClient usando Undici
httpClient.undici.get({ url: "https://api.example.com/data" }).then(console.log).catch(console.error);
```

## Uso de los clientes

<h3 id="axiosclient">
<code>AxiosClient</code>
</h3>

> **ℹ DESCRIPCIÓN:**<br>
> Cliente basado en Axios para realizar solicitudes HTTP.

<h3 id="fetchclient">
<code>FetchClient</code>
</h3>

> **ℹ DESCRIPCIÓN:**<br>
> Cliente basado en Fetch API para realizar solicitudes HTTP.

<h3 id="undiciclient">
<code>UndiciClient</code>
</h3>

> **ℹ DESCRIPCIÓN:**<br>
> Cliente basado en Undici para realizar solicitudes HTTP de alto rendimiento.

<h3 id="httpclient">
<code>HttpClient</code>
</h3>

> **ℹ DESCRIPCIÓN:**<br>
> Cliente genérico para realizar solicitudes HTTP.
