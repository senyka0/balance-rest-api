# Web3.js balance API 

## Clone this repository
```sh
gh repo clone senyka0/balance-rest-api
```
## Then install the dependencies
```sh
npm install
```
## Start the server

### Run in development mode
```sh
npm run dev
```
### Run in production mode
```sh
npm run prod
```
## API Request
| Endpoint | HTTP Method | Description |
| ------ | ------ | ------ |
| https://balance-rest-api.onrender.com/healthcheck	| GET |	Check if server is working |
| https://balance-rest-api.onrender.com/api/balance/:address |	GET	| Get address balance
