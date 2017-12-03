import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import * as Api from '../services/api';
import { getLocalStorageItem } from '../services/localStorage';
import { getIds, getFetchingIndex } from '../selectors/news';
import { 
    LOAD_INIT_ITEMS,
    LOAD_ITEMS,
    setFetchingStatus,
    setFetchingIndex,
    setItemsIds,
    setItem
} from '../reducers/news';
import { constants as networkConstants, setNetworkStatus } from '../reducers/network';

const DEFAULT_LOAD_NUMBER = 6;

function* loadInitialItems({ loadNumber }) {
    yield put(setFetchingStatus(true));

    const ids = yield call(fetchItemsIds);

    if (!ids) {
        yield put(setNetworkStatus(networkConstants.OFFLINE));
        return;
    }

    const idsSubset = ids.slice(0, loadNumber);

    // send network request concurrently
    // if sequential fetching is wanted then a for loop should
    // be used instead of sagas' all effect
    yield all(idsSubset.map(id => call(fetchItem, id)));

    yield put(setFetchingIndex(loadNumber));
    yield put(setFetchingStatus(false));
}

function* loadItems() {
    yield put(setFetchingStatus(true));

    const ids = yield select(getIds);
    const fetchingIndex = yield select(getFetchingIndex);

    const nextFetchingIndex = fetchingIndex + DEFAULT_LOAD_NUMBER;
    const idsSubset = ids.slice(fetchingIndex, nextFetchingIndex);

    const fetchedItems = yield all(idsSubset.map(id => call(fetchItem, id)));

    // if an entire fetching block fails the app is considered to be offline
    if (fetchedItems.every(fetchedItem => typeof fetchedItem === 'undefined'))  {
        yield put(setNetworkStatus(networkConstants.OFFLINE));
    } else {
        yield put(setFetchingIndex(nextFetchingIndex));
    }

    yield put(setFetchingStatus(false));
}

function* fetchItemsIds() {
    let ids;

    try {
        ids = yield call(Api.fetchItemsIds); 
    } catch (err) {
        ids = yield call(getLocalStorageItem, 'ids');
    }
    
    if (ids) {
        yield put(setItemsIds(ids));
    }

    return ids;
}

function* fetchItem(id) {
    let item;

    try {
        item = yield call(Api.fetchItem, id);

        if (item) {
            yield put(setItem(item));
        }
    } catch (err) {
        const items = yield call(getLocalStorageItem, 'items');
        item = items && items[id];
       
        if (item) {
            yield put(setItem(item, true));
        }
    }

    return item;
}

export const newsSagas = [
    takeEvery(LOAD_INIT_ITEMS, loadInitialItems),
    takeEvery(LOAD_ITEMS, loadItems)
];