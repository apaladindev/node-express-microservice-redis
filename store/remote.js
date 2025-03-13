const request = require('request');

function createRemoteDB(host, port) {
    const URL = `http://${host}:${port}`;

    function list(table) {
        return req('GET', table);
    }

    function get(table, id) {
        return req('GET', `${table}/${id}`);
    }

    function insert(table, data) {
        return req('POST', table, data);
    }

    function update(table, data) {        
        return req('PUT', table, data);
    }

    function query(table, query, join){}

    function req(method, table, data) {
        let url = URL + '/' + table;
        body = '';

        let options = {
            method,
            headers: {
                'content-type': 'application/json',
            },
            url,
            body,
        }

        if (method === 'POST' || method === 'PUT') {
            options.json = data;
        }        

        return new Promise((resolve, reject) => {
            request(options,
                (err, req, body) => {
                    if (err) {
                        console.error('Error in remote database: ' + err);
                        return reject(err.message);
                    }

                    let result;                    
                    if (body instanceof Object) {
                        result = body
                    } else {
                        result = JSON.parse(body);
                    }
                    return resolve(result.body);
                }
        );
        })
    }

    return { list, get, insert, update };
}

module.exports = createRemoteDB;