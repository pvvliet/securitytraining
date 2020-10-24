
export default class API
{
    static baseUrl = '';

    static credentials = null;

    static hasCredentials()
    {
        return API.credentials !== null;
    }

    static storeCredentials(username, password)
    {
        API.credentials = btoa(`${username}:${password}`);

        window.localStorage.setItem('credentials', API.credentials);
    }

    static loadCredentials()
    {
        const credentials = window.localStorage.getItem('credentials');

        API.credentials = credentials || null;
    }

    static deleteCredentials()
    {
        API.credentials = null;

        window.localStorage.removeItem('credentials');
    }

    static get(url, headers = null)
    {
        return API.send('GET', url, null, headers, undefined);
    }
    
    static getBlob(url, headers = null)
    {
        return API.send('GET', url, null, headers, 'blob');
    }
    
    static getArrayBuffer(url, headers = null)
    {
        return API.send('GET', url, null, headers, 'arraybuffer');
    }
    
    static post(url, data, headers = null)
    {
        return API.send('POST', url, data, headers, undefined);
    }
    
    static put(url, data, headers = null)
    {
        return API.send('PUT', url, data, headers, undefined);
    }
    
    static delete(url, headers = null)
    {
        return API.send('DELETE', url, null, headers, undefined);
    }
    
    static send(method, url, data, headers, responseType)
    {
        return new Promise((resolve, reject) =>
        {
            let request = new XMLHttpRequest();
            
            if(responseType)
            {
                request.responseType = responseType;
            }
            
            request.onreadystatechange = () =>
            {
                if (request.readyState === 4)
                {
                    if (request.status >= 200 && request.status < 300)
                    {
                        resolve(API.extractResult(request));
                    }
                    else if (request.status == 0 || request.status >= 300)
                    {
                        reject(API.extractResult(request));
                    }
                }
            };
            
            request.open(method, API.baseUrl + url, true);

            if (API.hasCredentials())
            {
                const authorization = `Basic ${API.credentials}`;

                request.setRequestHeader('Authorization', authorization);
            }

            if (headers instanceof Map)
            {
                for (let [key, value] of headers)
                {
                    request.setRequestHeader(key, value);
                }
            }
            
            if (data)
            {
                if (typeof data === 'object')
                {
                    request.setRequestHeader('Content-Type', 'application/json');

                    data = JSON.stringify(data);
                }

                request.send(data);
            }
            else
            {
                request.send()
            }
        });
    };

    static extractResult(request)
    {
        const content = request.responseText;
        const contentType = request.getResponseHeader('Content-Type');

        if (!content || !contentType)
        {
            return content;
        }

        return contentType.includes('json')
            ? JSON.parse(content)
            : content;
    }
}
