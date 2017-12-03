import SagaTester from 'redux-saga-tester';
import * as Api from '../services/api';
import * as localStorage from '../services/localStorage';
import rootSaga from './index';
import rootReducer from '../reducers';
import {
    loadInitalItems,
    loadItems,
    setFetchingStatus,
    setItemsIds,
    setItem,
    setFetchingIndex
} from '../reducers/news';

jest.mock('../services/api');
jest.mock('../services/localStorage');

describe('sagas/news', () => {
    let sagaTester = null;

    const ids = [1, 2, 3, 4, 5, 6, 7];
    const items = {
        1: { id: 1 },
        2: { id: 2 },
        3: { id: 3 },
        4: { id: 4 },
        5: { id: 5 },
        6: { id: 6 },
        7: { id: 7 }
    };
    
    beforeEach(() => {
        sagaTester = new SagaTester({
            reducers: rootReducer
        });
        sagaTester.start(rootSaga);

        Api.__reset();
        localStorage.__reset();
    });

    it('should retrieve the initial items from api items ids', () => {
        Api.__setIds(ids);
        Api.__setItems(items);

        sagaTester.dispatch(loadInitalItems(2));

        const calledActions = sagaTester.getCalledActions();

        expect(calledActions.length).toBe(7);
        expect(calledActions[0]).toEqual(loadInitalItems(2));
        expect(calledActions[1]).toEqual(setFetchingStatus(true));
        expect(calledActions[2]).toEqual(setItemsIds(ids));
        expect(calledActions[3]).toEqual(setItem(items[1]));
        expect(calledActions[4]).toEqual(setItem(items[2]));
        expect(calledActions[5]).toEqual(setFetchingIndex(2));
        expect(calledActions[6]).toEqual(setFetchingStatus(false));
    });

    it('should load more items from the api, having some item initally loaded', () => {
        sagaTester = new SagaTester({
            initialState: {
                news: {
                    itemsIds: ids,
                    fetchingIndex: 1,
                    items: {
                        1: items[1]
                    }
                }
            },
            reducers: rootReducer
        });
        sagaTester.start(rootSaga);

        Api.__setItems(items);

        sagaTester.dispatch(loadItems());

        const calledActions = sagaTester.getCalledActions();

        expect(calledActions.length).toBe(10);
        expect(calledActions[0]).toEqual(loadItems());
        expect(calledActions[1]).toEqual(setFetchingStatus(true));
        expect(calledActions[2]).toEqual(setItem(items[2]));
        expect(calledActions[3]).toEqual(setItem(items[3]));
        expect(calledActions[4]).toEqual(setItem(items[4]));
        expect(calledActions[5]).toEqual(setItem(items[5]));
        expect(calledActions[6]).toEqual(setItem(items[6]));
        expect(calledActions[7]).toEqual(setItem(items[7]));
        expect(calledActions[8]).toEqual(setFetchingIndex(7));
        expect(calledActions[9]).toEqual(setFetchingStatus(false));
    });

    it('should retrieve items from cached items ids', () => {
        Api.__setShouldThrow(true);
        localStorage.__setItem('ids', ids);
        localStorage.__setItem('items', items);

        sagaTester.dispatch(loadInitalItems(3));

        const calledActions = sagaTester.getCalledActions();

        expect(calledActions.length).toBe(8);
        expect(calledActions[0]).toEqual(loadInitalItems(3));
        expect(calledActions[1]).toEqual(setFetchingStatus(true));
        expect(calledActions[2]).toEqual(setItemsIds(ids));
        expect(calledActions[3]).toEqual(setItem(items[1], true));
        expect(calledActions[4]).toEqual(setItem(items[2], true));
        expect(calledActions[5]).toEqual(setItem(items[3], true));
        expect(calledActions[6]).toEqual(setFetchingIndex(3));
        expect(calledActions[7]).toEqual(setFetchingStatus(false));
    });
});