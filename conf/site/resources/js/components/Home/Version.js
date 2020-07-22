import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, ProgressBar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Changelog from '../Data/Changelog';

export default class Version extends Component {
    constructor(props) {
        super(props)

        this.state = {
            version: document.querySelector('meta[name="version"]').content,
            modalShow: false,
            changelog: [],
        };
    }

    componentDidMount() {
        // this.checkForUpdates();
    }

    showModal = () => {
        this.setState({
            modalShow: true
        });
    }

    hideModal = () => {
        this.setState({
            modalShow: false
        });
    }

    render() {
        var version = this.state.version;
        var modalShow = this.state.modalShow;
        var changelog = this.state.changelog;

        return (
            <div>
                <p className="text-muted mb-0 d-inline-block">Uptime Tracker Version: {version}</p>
                <Changelog />
            </div>
        );
    }
}

if (document.getElementById('Version')) {
    ReactDOM.render(<Version />, document.getElementById('Version'));
}
