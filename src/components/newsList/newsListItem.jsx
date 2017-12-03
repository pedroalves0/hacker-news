import React from 'react';
import PropTypes from 'prop-types';
import Ask from '../ask';
import Story from '../story';

class NewsListItem extends React.PureComponent {
    render() {
        const { id, url } = this.props;

        if (!id) {
            return null;
        }

        const content = url
            ? <Story {...this.props} />
            : <Ask {...this.props} />;

        return <li className="newslist-item">{content}</li>;
    }
}

NewsListItem.propTypes = {
    id: PropTypes.number.isRequired,
    by: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    text: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string
};

export default NewsListItem;