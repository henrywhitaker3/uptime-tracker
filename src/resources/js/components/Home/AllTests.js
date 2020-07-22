import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { Container, Row, Col, Collapse, Table, Button } from 'react-bootstrap';
import TableRow from './TableRow';

export default class AllTests extends Component {
    constructor(props) {
        super(props)

        this.state = {
            interval: null,
            loading: true,
            page: 1,
            lastPage: 1,
            data: [],
            show: false,
            refresh: true,
        }
    }

    componentDidMount() {
        this.getData();
        var int = setInterval(this.getData, 2500);
        this.setState({ interval: int });
    }

    getData = (page = this.state.page, refresh = true) => {
        var url = 'api/test?page=' + page;

        Axios.get(url)
        .then((resp) => {
            var data = resp.data.data.data;

            if(!refresh) {
                data = this.state.data.concat(data);
            }
            var page = resp.data.data.current_page;
            var lastPage = resp.data.data.last_page;
            console.lo
            this.setState({
                data: data,
                page: page,
                lastPage: lastPage,
                refresh: refresh
            });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    getMoreData = () => {
        var page = this.state.page;
        page = page + 1;

        if(this.state.refresh) {
            clearInterval(this.state.interval);
        }

        this.getData(page, false);
    }

    toggleCollapse = () => {
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
        var page = this.state.page;
        var lastPage = this.state.lastPage;
        var data = this.state.data;
        var show = this.state.show;
        var refresh = this.state.refresh;

        if(data.length > 0) {
            return (
                <Container className="mb-4 mt-4" fluid>
                    <Row>
                        <Col sm={{ span: 12 }} className="mb-3 text-center">
                            <div className="mouse"  aria-controls="testsTable" onClick={this.toggleCollapse} aria-expanded={show}>
                                <h4 className="d-inline mr-2">All tests</h4>
                                {(show) ?
                                    <span className="ti-angle-up"></span>
                                :
                                    <span className="ti-angle-down"></span>
                                }
                            </div>
                            {(show) &&
                                <div className="my-1">
                                    <span className="text-muted">Auto refresh: {(refresh) ? 'On' : 'Off'}</span>
                                </div>
                            }
                        </Col>
                    </Row>
                    <Collapse in={show}>
                        <div>
                            <Row>
                                <Col sm={{ span: 12 }} id="testsTable">
                                    <Table responsive>
                                        <thead>
                                            <tr className="text-center">
                                                <th>ID</th>
                                                <th>Time</th>
                                                <th>Type</th>
                                                <th>Success</th>
                                                <th>Target</th>
                                                {/* <th>More</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((e,i) => {
                                                return (
                                                    <TableRow key={e.id} data={e} />
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            {page < lastPage &&
                                <Row>
                                    <Col sm={{ span: 12 }} className="text-center">
                                        <Button variant="primary" onClick={this.getMoreData}>Show more</Button>
                                    </Col>
                                </Row>
                            }
                        </div>
                    </Collapse>
                </Container>
            );
        } else {
            return (
                <>
                </>
            )
        }
    }
}

if (document.getElementById('AllTests')) {
    ReactDOM.render(<AllTests />, document.getElementById('AllTests'));
}
