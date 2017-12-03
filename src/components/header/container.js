import { connect } from 'react-redux';
import { getNetworkStatus } from '../../selectors/network';
import { constants as networkConstants } from '../../reducers/network';
import Header from './header';

const mapStateToProps = state => {
    return {
        isOffline: getNetworkStatus(state) === networkConstants.OFFLINE
    };
};

export default connect(mapStateToProps)(Header);