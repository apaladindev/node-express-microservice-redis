const mysql = require('mysql2');
const { nanoid } = require('nanoid');
const config = require('./../config');

const dbConf = {
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

// Connection
let connection;
function handleCon() {
    connection = mysql.createConnection(dbConf);

    connection.connect((err) => {
        if (err) {
            console.error('[DB ERROR]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB connected');
        }
    });

    connection.on('error', (err) => {
        console.error('[DB ERROR]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    });
}

handleCon();

function list(table) {
    return new Promise((resolve, reject) => {
        const query = `Select * from ${table}`;
        connection.query(query, (err, data) => {
            if (err) return reject(err);

            resolve(data);
        });
    });
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${table} WHERE id='${id}'`;
        connection.query(query, (err, data) => {
            if (err) return reject(err);

            resolve(data);
        });
    });
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${table} SET ?`;
        connection.query(query, data, (err, result) => {
            if (err) return reject(err);

            resolve(result);
        });
    });
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE ${table} SET ? where id=?`;
        connection.query(query, [data, data.id], (err, result) => {
            if (err) return reject(err);

            resolve(result);
        });
    });
}

function upsert(table, data) {
    if (data && data.id) {
        return update(table, data);
    } else {
        return insert(table, data);
    }
}

function query(table, query, join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val}=${key}.id`;
    }

    return new Promise((resolve, reject) => {
        const q = `SELECT * FROM ${table} ${joinQuery} WHERE ?`;
        //console.log(q);
        
        connection.query(q, query, (err, res) => {
            if (err) return reject(err);
            resolve(res || null);
        });
    });
}

module.exports = { list, get, upsert, insert, update, query };