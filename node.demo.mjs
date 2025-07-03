import Client from './dist/odapp.cjs';
const client = new Client(false, true);

(async () => {
	console.log(await client.getBalances(['7VW3WKTRDRI7DE6345LEN23C3FDUOT7H']));
})();
