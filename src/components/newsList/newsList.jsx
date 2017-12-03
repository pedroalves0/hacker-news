import noop from 'lodash.noop';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { SyncLoader } from 'react-spinners';
import InfiniteScroller from '../infiniteScroller';
import NewsListItem from './newsListItem';

import './newsList.less';

class NewsList extends React.Component {
    constructor(props) {
        super(props);
        this.calculateInitialRowsNumber = this.calculateInitialRowsNumber.bind(this);
    }

    componentDidMount() {
        if (this.testList) {
            const initialRowsNumber = this.calculateInitialRowsNumber();
            this.props.onLoadInitialItems(initialRowsNumber);
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.items !== this.props.items ||
            nextProps.isFetching !== this.props.isFetching;
    }

    calculateInitialRowsNumber() {
        const testEl = this.testList.children[0];

        // fetch 2 more stories than necessary to create some initial scrolling space
        return Math.ceil(window.innerHeight / testEl.offsetHeight) + 2;
    }

    getTestListElement() {
        const testItem = {
            by: 'test-item',
            id: 1,
            time: 1175714200,
            title: 'test-item',
            url: 'test-item'
        };

        return <NewsListItem key={testItem.id} {...testItem} />;
    }

    render() {
        const { items, isFetching, isOffline, onLoadItems } = this.props;

        if (!items.length) {
            return (
                <ul
                    className="newslist"
                    ref={ref => this.testList = ReactDOM.findDOMNode(ref)}
                    style={{ visibility: 'hidden' }}
                >
                    {this.getTestListElement()}
                </ul>
            );
        }

        return (
            <InfiniteScroller isFetching={isFetching} isOffline={isOffline} onScrollBottomReached={onLoadItems}>
                <ul className="newslist">
                    {items.map(item =>
                        <NewsListItem key={item.id} {...item} />
                    )}
                    {isFetching &&
                        <li className="newslist-loader">
                            <SyncLoader size={10} />
                        </li>
                    }
                </ul>
            </InfiniteScroller>
        );
    }
}

NewsList.propTypes = {
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isOffline: PropTypes.bool.isRequired,
    onLoadInitialItems: PropTypes.func,
    onLoadItems: PropTypes.func
};

NewsList.defaultProps = {
    onLoadInitialItems: noop,
    onLoadItems: noop
};

export default NewsList;