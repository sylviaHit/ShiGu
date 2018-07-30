export const service = {
    get: function (url, params, headers) {
        // console.log('url', url);

        //若传入参数，则拼接 url
        if(params && params.constructor === Object){
            let param = '';
            for(let key in params){
                let item = params[key];

                param = `${param}${key}=${item}&`;
            }
            param = param.substring(0,param.length-1);
            url = `${url}?${param}`;
        }

        return new Promise(function (resolve, reject) {
            // console.log('response11--------------');
            fetch(url, {
                method: 'GET',
                headers: headers,
            })
                .then((response) => {
                    // console.log('response11', response);
                    if (response.ok) {
                        return response.json();
                    } else {
                        reject({status: response.status})
                    }
                })
                .then((response) => {
                    // console.log('response', response);
                    resolve(response);
                })
                .catch((err) => {
                    console.log('err', err);
                    reject({status: -1});
                })
        })
    },
    post: function (url, formData, headers) {
        console.log('url', url, formData);
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    if (response.ok) {
                        // console.log('response', response);
                        return response.json();
                    } else {
                        // console.log('response-------', response);
                        reject({status: response.status})
                    }
                })
                .then((response) => {
                    // console.log('response', response);
                    resolve(response);
                })
                .catch((err) => {
                    // console.log('err', err);
                    reject({status: -1});
                })
        })

    }
};
