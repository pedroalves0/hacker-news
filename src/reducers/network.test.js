import * as reducers from './network';

describe('reducers/network', () => {
    describe('status', () => {
        it('should return the initial state', () => {
            expect(reducers.status(undefined, {})).toBe(reducers.constants.ONLINE);
        });
    
        it('should set the network status', () => {
            expect(reducers.status(undefined, {
                type: reducers.SET_NETWORK_STATUS,
                status: reducers.constants.OFFLINE
            })).toBe(reducers.constants.OFFLINE);
            
            expect(reducers.status(undefined, {
                type: reducers.SET_NETWORK_STATUS,
                status: reducers.constants.ONLINE
            })).toBe(reducers.constants.ONLINE);

            expect(reducers.status(reducers.constants.OFFLINE, {
                type: reducers.SET_NETWORK_STATUS,
                status: reducers.constants.ONLINE
            })).toBe(reducers.constants.ONLINE);

            expect(reducers.status(reducers.constants.ONLINE, {
                type: reducers.SET_NETWORK_STATUS,
                status: reducers.constants.OFFLINE
            })).toBe(reducers.constants.OFFLINE);
        });
    });
});