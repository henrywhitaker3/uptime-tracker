import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Card } from 'react-bootstrap';

export default class Widget extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: this.props.title,
            value: this.props.value,
            icon: this.props.icon,
        }
    }

    componentDidUpdate = () => {
        if(this.props.title != this.state.title || this.props.value != this.state.value || this.props.icon != this.state.icon) {
            this.setState({
                title: this.props.title,
                value: this.props.value,
                icon: this.props.icon,
            });
        }
    }

    render() {
        var icon = this.state.icon;
        var title = this.state.title;
        var value = this.state.value;

        switch(icon) {
            case 'up':
                icon = <span className="ti-link icon text-success"></span>;
                break;
            case 'down':
                icon = <span className="ti-unlink icon text-warning"></span>;
                break;
        }

        return (
            <Card className="widget-card shadow-sm">
                <Card.Body>
                    <div>
                        <div>
                            <div className="d-flex align-items-center justify-content-between">
                                <h4>{title}</h4>
                                {icon}
                            </div>

                            <div className="text-truncate">
                                {value !== false &&
                                    <h3 className="d-inline">{value}</h3>
                                }
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

if (document.getElementById('Widget')) {
    ReactDOM.render(<Widget />, document.getElementById('Widget'));
}
