import React from 'react';
import PropTypes from 'prop-types';
import { FaExclamationTriangle } from 'react-icons/lib/fa';

import './header.less';

function Header({ isOffline }) {
    return (
        <div className="header">
            <span className="header-title">
                <span className="t-boldi">HACKER</span>
                <span className="t-bold">NEWS</span>
            </span>
            {isOffline && 
                <span className="header-offline">
                    <FaExclamationTriangle className="header-offline-icon" />
                    <span className="header-offline-text">App offline. No cached news found. Please refresh to try again.</span>
                </span>
            }
        </div>
    );
}

Header.propTypes = {
    isOffline: PropTypes.bool.isRequired
};

export default Header;