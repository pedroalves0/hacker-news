import { combineReducers } from 'redux';

export const constants = {
    OFFLINE: 'offline',
    ONLINE: 'online'
};

export const SET_NETWORK_STATUS = 'network/set-network-status';

export const setNetworkStatus = status => ({ type: SET_NETWORK_STATUS, status });

export const status = (state = constants.ONLINE, action) => {
    switch (action.type) {
        case SET_NETWORK_STATUS:
            return action.status;
        
        default:
            return state;
    }
};

export default combineReducers({
    status
});