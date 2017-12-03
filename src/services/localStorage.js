import localForage from 'localforage';
import { SET_ITEMS_IDS, SET_ITEM } from '../reducers/news';
import { getIds, getItems } from '../selectors/news';

localForage.config({ name: 'hackernews' });

export const persistor = store => next => action => {
    let result = next(action);

    switch (action.type) {
        case SET_ITEM:
            if (!action.isCached) {
                localForage.setItem('items', getItems(store.getState()));
            }
            break;

        case SET_ITEMS_IDS:
            localForage.setItem('ids', getIds(store.getState()));
            break;

        default:
            return result;
    }

    return result;
};

export const getLocalStorageItem = key =>
    localForage.getItem(key)
        .then(value => value)
        .catch(() => null);
