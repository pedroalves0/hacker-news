import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import { FaPlusSquare, FaMinusSquare } from 'react-icons/lib/fa';

import './ask.less';

class Ask extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleContentToggle = this.handleContentToggle.bind(this);

        this.state = {
            isContentShown: false
        };
    }

    handleContentToggle() {
        this.setState(prevState => ({ isContentShown: !prevState.isContentShown }));
    }

    render() {
        const { by, text, time, title } = this.props;

        return (
            <div className="ask">
                <div className="ask-title">
                    <span>{title}</span>
                    {text &&
                        <button className="ask-title-toggle" onClick={this.handleContentToggle}>
                            {this.state.isContentShown ? <FaMinusSquare /> : <FaPlusSquare />}
                        </button>
                    }
                </div>
                <div className="ask-info">
                    <span>by <span className="t-ital">{by} - </span></span>
                    <TimeAgo date={new Date(time * 1000)} />
                </div>
                {this.state.isContentShown &&
                    <p className="ask-content" dangerouslySetInnerHTML={{ __html: text }} />
                }
            </div>
        );
    }
}

Ask.propTypes = {
    by: PropTypes.string.isRequired,
    text: PropTypes.string,
    time: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
};

export default Ask;