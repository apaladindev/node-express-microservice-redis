const { nanoid } = require('nanoid');

const TABLE = 'post'

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
        const post = {
            id: data.id ? data.id : nanoid(),
            title: data.title,
            user_id: data.user_id,
        };
        let result;

        if (data.id) {
            result = store.update(TABLE, post);
        } else {
            result = store.insert(TABLE, post);
        }

        return result;
    }



    return { list, get, upsert };
}