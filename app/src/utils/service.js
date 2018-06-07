export const service = {
    get: function (url, params, headers) {

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
            fetch(url, {
                method: 'GET',
                headers: headers,
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        reject({status: response.status})
                    }
                })
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject({status: -1});
                })
        })
    },
    post: function (url, formData, headers) {
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: 'POST',
                headers: headers,
                body: formData,
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        reject({status: response.status})
                    }
                })
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject({status: -1});
                })
        })

    }
};