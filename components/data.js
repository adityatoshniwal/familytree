
export const ROW_COL_MAP = [
    "name", "dob", "gender", "fromCity", "currCity", "mothersName", "fathersName", "other"
]

export function getQueryParam(location, baseUrl, queryKey) {
    if(location && location.pathname == baseUrl) {
        const query = new URLSearchParams(location.search);
        return query.get(queryKey);
    }
    return null;
}

export function getPersonUrl(person) {
    return '/person?key='+getPersonKey(person);
}

export function getPersonKey(data) {
    return data.name;
}

export function getFullName(data) {
    return data.name;
}

export function getChildren(data, person) {
    let childs = [];
    Object.keys(data).map((key)=>{
        if(person.gender.toUpperCase() == 'M' && data[key].fathersName == person.name) {
            childs.push(data[key]);
        } else if(person.gender.toUpperCase() == 'F' && data[key].mothersName == person.name) {
            childs.push(data[key]);
        }
    })
    return childs;
}

export function getParents(data, person) {
    let parents = [];
    if(person.fathersName) {
        if(data[person.fathersName]) {
            parents.push(data[person.fathersName]);
        } else {
            parents.push(person.fathersName);
        }
    }

    if(person.mothersName) {
        if(data[person.mothersName]) {
            parents.push(data[person.mothersName]);
        } else {
            parents.push(person.mothersName);
        }
    }
    return parents;
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
    sheetName: 'main'
}

function preProcessData(data) {
    let dataDict = {};
    if(data.length > 1) {
        data.slice(1).forEach((row)=>{
            let obj = {};
            for(let i=0; i<ROW_COL_MAP.length; i++) {
                obj[ROW_COL_MAP[i]] = row[i];
            }
            obj['url'] = getPersonUrl(obj);

            dataDict[getPersonKey(obj).trim()] = obj;
        });
    }
    return dataDict;
}

export function getSheetData() {
    return new Promise((resolve, reject)=>{
        let GoogleAuth = window.gapi.auth2.getAuthInstance();
        if(GoogleAuth.isSignedIn.get()) {
            const clientInit = (retry)=>{
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
                    if(retry > 2) {
                        reject(error);
                    } else {
                        setTimeout(()=>{
                            clientInit(retry++);
                        }, 1000)
                    }
                });
            }
            clientInit(0);
        }        
    });
}