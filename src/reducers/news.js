import { combineReducers } from 'redux';

export const LOAD_INIT_ITEMS = 'news/load-init-items';
export const LOAD_ITEMS = 'news/load-items';

export const SET_FETCHING_STATUS = 'news/set-fetching-status';
export const SET_FETCHING_INDEX = 'news/set-fetching-index';
export const SET_ITEMS_IDS = 'news/set-items-ids';
export const SET_ITEM = 'news/set-item';

export const loadInitalItems = loadNumber => ({ type: LOAD_INIT_ITEMS, loadNumber });
export const loadItems = () => ({ type: LOAD_ITEMS });

export const setFetchingStatus = isFetching => ({ type: SET_FETCHING_STATUS, isFetching });
export const setFetchingIndex = fetchingIndex => ({ type: SET_FETCHING_INDEX, fetchingIndex });
export const setItemsIds = itemsIds => ({ type: SET_ITEMS_IDS, itemsIds });
export const setItem = (item, isCached = false) => ({ type: SET_ITEM, item, isCached });

export const isFetching = (state = false, action) => {
    switch (action.type) {
        case SET_FETCHING_STATUS:
            return action.isFetching;
        
        default:
            return state;
    }
};

export const fetchingIndex = (state = 0, action) => {
    switch (action.type) {
        case SET_FETCHING_INDEX:
            return action.fetchingIndex;
        
        default:
            return state;
    }
};

export const itemsIds = (state = [], action) => {
    switch (action.type) {
        case SET_ITEMS_IDS:
            return action.itemsIds;
        
        default:
            return state;
    }
};


export const items = (state = {}, action) => {
    switch (action.type) {
        case SET_ITEM:
            return {
                ...state,
                [action.item.id]: action.item
            };
        
        default:
            return state;
    }
};

export default combineReducers({
    isFetching,
    fetchingIndex,
    itemsIds,
    items
});