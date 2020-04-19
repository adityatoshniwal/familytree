componentDidMount() {
	const gapiScript = document.createElement('script')
	gapiScript.src = 'https://apis.google.com/js/api.js?onload=onGapiLoad'
	window.onGapiLoad = function onGapiLoad() {
		gapi.load('auth', {'callback': onAuthApiLoad})
		function onAuthApiLoad() {
			gapi.auth.init()
		}
	}
	document.body.appendChild(gapiScript)
}

function start() {
// 2. Initialize the JavaScript client library.
gapi.client.init({
    'apiKey': 'AIzaSyBHLdeH6904EfzVpBM0vg8QqnZ0quH98ds',
    // Your API key will be automatically added to the Discovery Document URLs.
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
}).then(function() {
    console.log('success...');
    return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '15Wpn0Ng-THDo-B7FJLt0Co9vYGwkMZHE6HgJ0MkJwqo',
        range: 'A1:A1'
    }).then((response) => {
        var result = response.result;
        var numRows = result.values ? result.values.length : 0;
        console.log(result.values);
        console.log(`${numRows} rows retrieved.`);
    });
}).then(function(response) {
    console.log(response.result);
}, function(reason) {
    console.log('Error: ' + reason.result.error.message);
});
};
// 1. Load the JavaScript client library.
console.log('loading...');
gapi.load('client', start);%                              