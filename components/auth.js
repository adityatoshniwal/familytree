function waitForGapiProcessed(script, retry=0) {
    return new Promise((resolve, reject)=>{
        if(script.getAttribute('gapi_processed')) {
            resolve();
        } else if(retry >= 50) {
            console.log('Failed to processs GAPI');
            reject();
        } else {
            setTimeout(()=>{
                resolve(waitForGapiProcessed(script, ++retry));
            }, 100);
        }
    });
}

export function loadGapiScript() {
    if(window.gapi) {
        return Promise.resolve();
    }
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.onload = () => {
            // Gapi isn't available immediately so we have to wait until it is to use gapi.
            resolve(waitForGapiProcessed(script));
        };
        script.src = "https://apis.google.com/js/client.js";
        document.body.appendChild(script);
    });
}

export function isSignedIn() {
    if(window.gapi && window.gapi.auth2) {
        let GoogleAuth = window.gapi.auth2.getAuthInstance();
        return GoogleAuth.isSignedIn.get();
    }

    return false;
}

export function getSignedInUser() {
    if(isSignedIn()) {
        let userProfile = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
        return {
            email: userProfile.getEmail(),
            name: userProfile.getName(),
            imgUrl: userProfile.getImageUrl(),
        }
    }
    return null;
}

export function signIn() {
    if(window.gapi && window.gapi.auth2) {
        window.gapi.auth2.getAuthInstance().signIn();
    }
}

export function signOut() {
    if(window.gapi && window.gapi.auth2) {
        window.gapi.auth2.getAuthInstance().signOut();
    }
}

export function initAuth2(params) {
    return new Promise((resolve, reject)=>{
        window.gapi.load('auth2', () => {
            let GoogleAuth = window.gapi.auth2.init({ux_mode: 'redirect'});
            
            if(params.onSignInChanged) {
                GoogleAuth.isSignedIn.listen(params.onSignInChanged);
            }

            if(params.onCurrentUserChanged) {
                GoogleAuth.currentUser.listen(params.onCurrentUserChanged);
            }

            GoogleAuth.then(()=>{
                resolve();
            }).catch((error)=>{
                reject(error);
            })
            
        });
    });
}
