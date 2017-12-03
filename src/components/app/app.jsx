import React, { Component } from 'react';
import Header from '../header';
import NewsList from '../newsList';

import './app.less';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <div className="container">
                    <NewsList />
                </div>
            </div>
        );
    }
}

export default App;