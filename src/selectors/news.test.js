import * as selectors from './news';

describe('selectors/news', () => {
    describe('getSortedItems', () => {
        const itemsIds = [100, 200, 300];
        const items = {
            200: { id: 200 },
            100: { id: 100 },
            300: { id: 300 }
        };

        const state = {
            news: {
                itemsIds,
                items
            }
        };

        it('should return a sorted items list', () => {
            expect(selectors.getSortedItems(state)).toEqual([
                { id: 100 },
                { id: 200 },
                { id: 300 }
            ]);
        });

        it('should cache the arguments and return the same list reference', () => {
            const sorted = selectors.getSortedItems(state);
            const sorted2 = selectors.getSortedItems(state);

            expect(sorted).toBe(sorted2);

            const sorted3 = selectors.getSortedItems({
                ...state,
                news: { 
                    ...state.news,
                    itemsIds: [100, 200, 300, 400] 
                }
            });

            expect(sorted2).not.toBe(sorted3);
        });
    });
});

    

