import * as reducers from './news';

describe('reducers/news', () => {
    describe('isFetching', () => {
        it('should return the initial state', () => {
            expect(reducers.isFetching(undefined, {})).toBe(false);
        });
    
        it('should set the fetching status', () => {
            expect(reducers.isFetching({}, {
                type: reducers.SET_FETCHING_STATUS,
                isFetching: true
            })).toBe(true);

            expect(reducers.isFetching({}, {
                type: reducers.SET_FETCHING_STATUS,
                isFetching: false
            })).toBe(false);
        });
    });

    describe('fetchingIndex', () => {
        it('should return the initial state', () => {
            expect(reducers.fetchingIndex(undefined, {})).toBe(0);
        });
    
        it('should set the fetching index', () => {
            expect(reducers.fetchingIndex({}, {
                type: reducers.SET_FETCHING_INDEX,
                fetchingIndex: 20
            })).toBe(20);
        });
    });

    describe('itemsIds', () => {
        it('should return the initial state', () => {
            expect(reducers.itemsIds(undefined, {})).toEqual([]);
        });

        it('should set items ids', () => {
            expect(reducers.itemsIds(undefined, {
                type: reducers.SET_ITEMS_IDS,
                itemsIds: [1, 2, 3]
            })).toEqual([1, 2, 3]);

            expect(reducers.itemsIds([1, 2, 3], {
                type: reducers.SET_ITEMS_IDS,
                itemsIds: [4, 5, 6]
            })).toEqual([4, 5, 6]);
        });
    });


    describe('items', () => {
        it('should return the initial state', () => {
            expect(reducers.items(undefined, {})).toEqual({});
        });

        it('should set an item', () => {
            expect(reducers.items(undefined, {
                type: reducers.SET_ITEM,
                item: { id: 1 }
            })).toEqual({ 1: { id: 1 }});

            const state = {
                1: { id: 1, deleted: false },
                2: { id: 2, deleted: false }
            };

            expect(reducers.items(state, {
                type: reducers.SET_ITEM,
                item: { id: 3, deleted: false }
            })).toEqual({ ...state, 3: { id: 3, deleted: false }});
            

            expect(reducers.items(state, {
                type: reducers.SET_ITEM,
                item: { id: 2, deleted: true }
            })).toEqual({ ...state, 2: { id: 2, deleted: true }});
        });
    });
});

