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