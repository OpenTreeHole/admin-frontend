interface WebIOConfig {
    method: 'GET' | 'POST' | 'CREATE' | 'PUT' | 'DELETE',
    data: any,
    header: {
        [key: string]: any
    }
}

interface WebIOResponse {
    status_code: number
    body: any
}

export function webio(url: string, config: WebIOConfig): WebIOResponse {
    let xhr = new XMLHttpRequest()
    xhr.open(config.method, url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Accept', 'application/json')
    for (let key in config.header) {
        xhr.setRequestHeader(key, config.header[key])
    }
    xhr.send(JSON.stringify(config.data))
    xhr.onload = function () {
        return { status_code: xhr.status, body: JSON.parse(xhr.responseText) }
    }
    while (1); // waiting for the response
    return {
        status_code: 0,
        body: null
    }
}