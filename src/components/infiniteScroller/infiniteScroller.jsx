import noop from 'lodash.noop';
import React from 'react';
import PropTypes from 'prop-types';

class InfiniteScroller extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 &&
            !this.props.isFetching && !this.props.isOffline) {
            this.props.onScrollBottomReached();
        }
    }

    render() {
        return this.props.children;
    }
}

InfiniteScroller.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isOffline: PropTypes.bool.isRequired,
    onScrollBottomReached: PropTypes.func
};

InfiniteScroller.defaultProps = {
    onScrollBottomReached: noop
};

export default InfiniteScroller;