class HttpClient {
    static async get({ url = '', method = '', body = JSON.parse('{}') }) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            // console.log(url);
            request.open(method, url, true);
            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    })
                }
            }
            request.onerror = () => {
                reject({
                    status: request.status,
                    statusText: request.statusText
                })
            }

            if (body) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                body = JSON.stringify(body);
            }
            request.send(body);
        })
    }
}