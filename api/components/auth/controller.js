const bcrypt = require('bcrypt');
const auth = require('./../../../auth');
const error = require('../../../utils/error');

const TABLE = 'auth';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('./../../../store/dummy');
    }

    async function login(username, password) {
        const data = (await store.query(TABLE, { username: username }))[0];

        return bcrypt.compare(password, data.password)
            .then(isMatch => {
                if (isMatch === true) {
                    delete data.password;
                    return auth.sign(data);        
                } else {
                    throw error('Invalid credentials', 401);
                }
            })
    }

    async function upsert(returnUser, data) {
        const authData = {
            id: data.id
        }

        if (data.username) {
            authData.username = data.username;
        }
        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 10);
        }
        
        if (returnUser) {
            return store.update(TABLE, authData);
        } else {
            return store.insert(TABLE, authData);
        }
    }

    return { TABLE, login, upsert };
};