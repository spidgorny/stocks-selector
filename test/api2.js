var axios = require("axios").default;

var options = {
	method: 'GET',
	url: 'https://yh-finance.p.rapidapi.com/market/v2/get-quotes',
	params: {region: 'US', symbols: 'AMD,IBM,AAPL'},
	headers: {
		'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
		'x-rapidapi-key': 'mkHMPf7Y6Gmsh7LJWjD21A9JCcOcp1oi3UEjsn6lIO6msTUt0C'
	}
};

axios.request(options).then(function (response) {
	console.dir(response.data, {depth: null});
}).catch(function (error) {
	console.error(error);
});