import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import URL from 'url-parse';

import './story.less';

function Story({ by, time, title, url }) {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^(www\.)/, '');

    return (
        <div className="story">
            <div className="story-title">
                <a className="story-title-link" href={url}>{title}</a>
                <span className="story-title-hostname"> (<a href={parsedUrl.origin}>{hostname}</a>)</span>
            </div>
            <div className="story-info">
                <span>by <span className="t-ital">{by} - </span></span>
                <TimeAgo date={new Date(time * 1000)} />
            </div>
        </div>
    );
}

Story.propTypes = {
    by: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};

export default Story;