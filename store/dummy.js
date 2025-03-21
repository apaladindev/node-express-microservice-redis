const db = {
    'user': [
        { id: '1', name: 'Alejandro' },
    ],
};

async function list(table) {
    return db[table] || [];
}

async function get(table, id) {
    let col = await list(table);
    return col.filter(item => item.id === id)[0] || null;
}

async function upsert(table, data) {
    if (!db[table]) {
        db[table] = [];
    }

    const user = db[table].find(item => item.id === data.id);
    if (user) {
        user.name = data.name;
    } else {
        db[table].push(data);
    }
    
    return data;
}

async function remove(table, id) {    
    const index = db[table].findIndex(item => item.id === id);
    if(index >= 0) {
        db[table].splice(index, 1);
    }
    return id;
}

async function query(table, q) {
    let col = await list(table);
    let keys = Object.keys(q);
    let key = keys[0];
    return col.filter(item => item[key] === q[key])[0] || null;
}


module.exports = { list, get, upsert, remove, query }