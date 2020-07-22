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
        var success = Boolean(Number(e.success));

        return (
            <tr className="text-center">
                    <td style={{width: '5%'}}>{e.id}</td>
                    <td style={{width: '10%'}}>{new Date(e.created_at).toLocaleString()}</td>
                    <td style={{width: '8%'}}>{e.type}</td>
                    <td style={{width: '5%'}}>{success ? 'Yes' : 'No'}</td>
                    <td style={{width: '16%'}}>{e.target}</td>
                    <td style={{width: '16%'}}>{e.error != null ? e.error : '-' }</td>
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
