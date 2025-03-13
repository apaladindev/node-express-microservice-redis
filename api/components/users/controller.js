const { nanoid } = require('nanoid');
const auth = require('./../auth');

const TABLE = 'user'

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('./../../../store/dummy');
    }

    function list() {
        return store.list(TABLE);
    }

    function get(id) {
        return store.get(TABLE, id);
    }

    async function upsert(data) {
        const user = {
            id: data.id ? data.id : nanoid(),
            name: data.name,
            username: data.username,
        };
        let result;

        const authUser = {
            id: user.id,
            username: user.username,
            password: data.password,
        };

        if (data.id) {
            if (data.username || data.password) {
                await auth.upsert(true, authUser);
            }
            result = store.update(TABLE, user);
        } else {
            if (data.username || data.password) {
                await auth.upsert(false , authUser);
            }
            result = store.insert(TABLE, user);
        }

        return result;
    }

    function remove(id) {
        return store.remove(TABLE, id);
    }

    function follow(from, to) {
        return store.upsert(TABLE + '_follow', {
            user_from: from,
            user_to: to
        });
    }

    function following(user) {
        const join = {};
        join[TABLE] = 'user_to';
        const query = { user_from: user };
        return store.query(TABLE + '_follow', query, join);
    }

    return { list, get, upsert, remove, following, follow };
}