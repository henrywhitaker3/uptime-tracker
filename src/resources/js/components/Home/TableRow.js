import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'react-bootstrap';

export default class TableRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: this.props.data,
            show: false,
        }
    }

    toggleShow = () => {
        var show = this.state.show;
        if(show) {
            this.setState({
                show: false
            });
        } else {
            this.setState({
                show: true
            });
        }
    }

    render() {
        var e = this.state.data;
        var show = this.state.show;

        return (
            <tr className="text-center">
                    <td>{e.id}</td>
                    <td>{new Date(e.created_at).toLocaleString()}</td>
                    <td>{e.type}</td>
                    <td>{e.success}</td>
                    <td>{e.target}</td>
                    {/* <td>
                        <span onClick={this.toggleShow} className="ti-arrow-top-right mouse"></span>
                        <Modal show={show} onHide={this.toggleShow}>
                            <Modal.Header>
                                <Modal.Title>More info</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="text-center">
                                <p>Target: {e.target}</p>
                            </Modal.Body>
                        </Modal>
                    </td> */}
                </tr>
        );
    }
}

if (document.getElementById('TableRow')) {
    ReactDOM.render(<TableRow />, document.getElementById('TableRow'));
}
