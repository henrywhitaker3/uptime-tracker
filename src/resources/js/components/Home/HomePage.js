import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Settings from '../Settings/Settings';
import Footer from './Footer';
import WidgetRow from './WidgetRow';
import AllTests from './AllTests';

export default class HomePage extends Component {

    render() {
        return (
            <div>
                <div className="my-4">
                    <WidgetRow />
                    <AllTests />
                    <Settings />
                </div>
                <Footer />
            </div>
        );
    }
}

if (document.getElementById('homePage')) {
    ReactDOM.render(<HomePage />, document.getElementById('homePage'));
}
