import { combineReducers } from 'redux';
import newsReducer from './news';
import networkReducer from './network';

const rootReducer = combineReducers({
    news: newsReducer,
    network: networkReducer
});

export default rootReducer;