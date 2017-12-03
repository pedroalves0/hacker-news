import { connect } from 'react-redux';
import * as newsReducer from '../../reducers/news';
import { getIds, getFetchingStatus, getSortedItems } from '../../selectors/news';
import { getNetworkStatus } from '../../selectors/network';
import { constants as networkConstants } from '../../reducers/network';
import NewsList from './newsList';

const mapStateToProps = state => {
    return {
        ids: getIds(state),
        items: getSortedItems(state),
        isFetching: getFetchingStatus(state),
        isOffline: getNetworkStatus(state) === networkConstants.OFFLINE
    };
};

const mapDispatchToProps = {
    onLoadInitialItems: newsReducer.loadInitalItems,
    onLoadItems: newsReducer.loadItems
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);