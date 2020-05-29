
export const ROW_COL_MAP = [
    "firstName", "lastName", "dob"
]

export function getQueryParam(location, baseUrl, queryKey) {
    if(location && location.pathname == baseUrl) {
        const query = new URLSearchParams(location.search);
        return query.get(queryKey);
    }
    return null;
}

export function getPersonKey(data) {
    return `${data.firstName}${data.lastName}`;
}

export function searchPerson(data, key) {
    if(data) {
        for(let i=0; i<data.length; i++) {
            if(getPersonKey(data[i]) == key) {
                return data[i];
            }
        }        
    }
    return null;
}

const gapi_sheet = {
    'apiKey': 'AIzaSyBHLdeH6904EfzVpBM0vg8QqnZ0quH98ds',
    spreadsheetId: '15Wpn0Ng-THDo-B7FJLt0Co9vYGwkMZHE6HgJ0MkJwqo',
    sheetName: 'Sheet1'
}

function preProcessData(data) {
    if(data.length > 1) {
        data = data.slice(1).map((row)=>{
            let obj = {};
            for(let i=0; i<ROW_COL_MAP.length; i++) {
                obj[ROW_COL_MAP[i]] = row[i];
            }
            return obj;
        });
        return data;
    } else {
        return [];
    }
}

export function getSheetData() {
    return new Promise((resolve, reject)=>{
        let GoogleAuth = window.gapi.auth2.getAuthInstance();
        if(GoogleAuth.isSignedIn.get()) {
            window.gapi.client.init({
                'apiKey': gapi_sheet['apiKey'],
                'scope': 'https://www.googleapis.com/auth/spreadsheets',
                'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            }).then(function() {
                return window.gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: gapi_sheet['spreadsheetId'],
                    range: gapi_sheet['sheetName'],
                }).then((response) => {
                    resolve(preProcessData(response.result.values));
                });
            }).catch((error)=>{
                reject(error);
            });
        }        
    });
}