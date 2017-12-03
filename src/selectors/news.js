import { createSelector } from 'reselect';

export const getNewsState = state => state.news;
export const getIds = state => getNewsState(state).itemsIds;
export const getItems = state => getNewsState(state).items;
export const getFetchingStatus = state => getNewsState(state).isFetching;
export const getFetchingIndex = state => getNewsState(state).fetchingIndex;

export const getSortedItems = createSelector(
    getIds,
    getItems,
    (ids, items) => {
        const itemsNumber = Object.keys(items).length;
        const sortedItems = [];

        let fetchedItemsCounter = 0;

        // ids list comes sorted from the backend, no need to perform sorting
        // skip non-fetched items
        for (let i = 0; i < ids.length && fetchedItemsCounter < itemsNumber; i++) {
            const id = ids[i];

            if (items[id]) {
                sortedItems.push(items[id]);
                fetchedItemsCounter++;
            }
        }

        return sortedItems;
    }
);
