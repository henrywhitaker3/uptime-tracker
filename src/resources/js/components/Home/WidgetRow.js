import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Axios from 'axios';
import Loader from '../Loader';
import Widget from '../Graphics/Widget';
import { toast } from 'react-toastify';

export default class WidgetRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            latest: null,
            uptime: null,
            loading: true,
            interval: null,
        }
    }

    componentDidMount() {
        this.getStatus();
        var interval = setInterval(this.getStatus, 2500);
        this.setState({
            interval: interval
        });
    }

    getStatus = () => {
        var url = 'api/uptime/status';

        Axios.get(url)
        .then((resp) => {
            this.setState({
                loading: false,
                latest: resp.data.latest,
                uptime: resp.data.uptime,
            });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    newTest = () => {
        var url = 'api/test/run';

        Axios.get(url)
        .then((resp) => {
            toast.success('A new connection test has been queued.');
        })
        .catch((err) => {
            console.log(err);
            toast.error('Something went wrong.');
        })
    }

    buildTestData = (latest, uptime, success) => {
        if(latest.type == 'ping') {
            return (
                <div className="text-truncate text-muted">
                    <p className="my-0">Type: {latest.type}</p>
                    <p className="my-0">Target: {latest.target}</p>
                    <p className="my-0">Time: {new Date(latest.created_at).toLocaleString()}</p>
                </div>
            )
        }

        if(latest.type == 'healthchecks') {
            return (
                <div className="text-truncate text-muted">
                    <p className="my-0">Type: {latest.type}</p>
                    <p className="my-0">Time: {new Date(latest.created_at).toLocaleString()}</p>
                </div>
            )
        }
    }

    buildUptimeData = (uptime, success) => {
        return (
            <div className="text-truncate text-muted">
                <p className="my-0">7 days: {uptime.stats.d7.percentage.toFixed(1)}% (Up: {uptime.stats.d7.up}, Down: {uptime.stats.d7.down})</p>
                <p className="my-0">30 days: {uptime.stats.d30.percentage.toFixed(1)}% (Up: {uptime.stats.d30.up}, Down: {uptime.stats.d30.down})</p>
                <p className="my-0">Total: {uptime.stats.total.percentage.toFixed(1)}% (Up: {uptime.stats.total.up}, Down: {uptime.stats.total.down})</p>
            </div>
        );
    }

    render() {
        var loading = this.state.loading;
        var latest = this.state.latest;
        var uptime = this.state.uptime;

        if(loading) {
            return (
                <Loader />
                );
            } else {
            var success = Boolean(Number(latest.success));
        }

        return (
            <Container fluid>
                <Row>
                    <Col sm={{ span: 12 }} className="text-center mb-2">
                            {uptime.readable == 'N/A' ?
                                <div>
                                    <Button className="d-inline-block mx-3 mb-2" variant="primary" onClick={this.newTest}>Test connection</Button>
                                </div>
                            :
                                <div>
                                    <Button className="d-inline-block mx-3 mb-2" variant="primary" onClick={this.newTest}>Test again</Button>
                                    <p className="text-muted mb-0 d-inline-block">Last test performed at: {new Date(latest.created_at).toLocaleString()}</p>
                                </div>
                            }
                    </Col>
                </Row>
                <Row>
                    <Col
                        lg={{ span: 4, offset: 2 }}
                        md={{ span: 6 }}
                        sm={{ span: 12 }}
                        className="mb-2"
                    >
                        <Card className="widget-card shadow-sm">
                            <Card.Body>
                                <div>
                                    <div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h4>Status: {success ? 'Online' : 'Offline' }</h4>
                                            {success ?
                                                <span className="ti-link icon text-success"></span>
                                            :
                                                <span className="ti-unlink icon text-danger"></span>
                                            }
                                        </div>

                                        {uptime.readable == 'N/A' ?
                                            <div className="text-muted">
                                                <p className="my-0">No connection tests have been run yet</p>
                                            </div>
                                        :
                                            this.buildTestData(latest, uptime, success)
                                        }
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col
                        lg={{ span: 4 }}
                        md={{ span: 6 }}
                        sm={{ span: 12 }}
                        className="mb-2"
                    >
                        <Card className="widget-card shadow-sm">
                            <Card.Body>
                                <div>
                                    <div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h4>{success ? 'Uptime:' : 'Downtime:'} {uptime.readable}</h4>
                                            {success ?
                                                <span className="ti-timer icon text-success"></span>
                                            :
                                                <span className="ti-timer icon text-danger"></span>
                                            }
                                        </div>

                                        {uptime.readable == 'N/A' ?
                                            <div className="text-muted">
                                                <p className="my-0">No connection tests have been run yet</p>
                                            </div>
                                        :
                                            this.buildUptimeData(uptime, success)
                                        }
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

if (document.getElementById('WidgetRow')) {
    ReactDOM.render(<WidgetRow />, document.getElementById('WidgetRow'));
}
