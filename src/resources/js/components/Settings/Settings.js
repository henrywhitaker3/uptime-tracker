import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Container, Row, Col, Collapse } from 'react-bootstrap';
import Loader from '../Loader';
import Axios from 'axios';
import Setting from './Setting';
import SettingWithModal from './SettingWithModal';

export default class Settings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            loading: true,
            data: [],
        }
    }

    componentDidMount = () => {
        this.getData();
    }

    toggleShow = () => {
        if(this.state.show) {
            var show = false;
        } else {
            var show = true;
        }

        this.setState({
            show: show
        });
    }

    getData = () => {
        var url = 'api/settings/';

        Axios.get(url)
        .then((resp) => {
            this.setState({
                loading: false,
                data: resp.data
            });
        })
        .catch((err) => {
            if(err.response) {

            }
        })
    }

    buildSettingsCards = () => {
        var e = this.state.data;
        return (
            <Row>
                <Col lg={{ span: 4 }} md={{ span: 6 }} sm={{ span: 12 }}>
                    <Setting title="Test schedule" name={e.test_schedule.name} value={e.test_schedule.value} description={e.test_schedule.description} />
                </Col>
                <Col lg={{ span: 4 }} md={{ span: 6 }} sm={{ span: 12 }}>
                    <Setting title="Test type" name={e.test_type.name} value={e.test_type.value} description={e.test_type.description} input="select" options={[
                        {name: 'Ping', value: 'ping'},
                        {name: 'Healthchecks', value: 'healthchecks'}
                    ]} />
                </Col>
                <Col lg={{ span: 4 }} md={{ span: 6 }} sm={{ span: 12 }}>
                    <SettingWithModal
                        title="Healthchecks settings"
                        description="Configure settings for the healthchecks connection tests"
                        autoClose={true}
                        settings={[
                            {
                                obj: e.healthchecks_url,
                                type: 'text'
                            },
                            {
                                obj: e.healthchecks_uuid,
                                type: 'text'
                            }
                        ]}
                    />
                </Col>
            </Row>
        )
    }

    render() {
        var show = this.state.show;
        var loading = this.state.loading;
        var data = this.state.data;

        if(!loading) {
            var cards = this.buildSettingsCards();
        }

        return (
            <div>
                <Container className="my-4">
                    <Row>
                        <Col sm={{ span: 12 }} className="mb-3 text-center">
                            <div className="mouse" onClick={this.toggleShow}>
                                <h4 className="mb-0 mr-2 d-inline">Settings</h4>
                                {(show) ?
                                    <span className="ti-angle-up"></span>
                                :
                                    <span className="ti-angle-down"></span>
                                }
                            </div>
                        </Col>
                    </Row>
                    <Collapse in={show}>
                        <div>
                            <Row>
                                <Col sm={{ span: 12 }}>
                                    {loading ?
                                        <Loader small />
                                    :
                                        cards
                                    }
                                </Col>
                            </Row>
                        </div>
                    </Collapse>
                </Container>

            </div>
        );
    }
}

if (document.getElementById('Settings')) {
    ReactDOM.render(<Settings />, document.getElementById('Settings'));
}
