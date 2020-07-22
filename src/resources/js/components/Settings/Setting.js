import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Card, Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';

export default class Setting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.name,
            value: this.props.value,
            description: this.props.description,
            title: this.props.title,
            input: this.props.input,
            options: this.props.options,
        }
    }

    ucfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    update = () => {
        var url = 'api/settings';
        var data = {
            name: this.state.name,
            value: this.state.value
        };

        Axios.post(url, data)
        .then((resp) => {
            toast.success(this.ucfirst(this.state.title) + ' updated');
        })
        .catch((err) => {
            if(err.response.status == 422) {
                var errors = err.response.data.error;
                for(var key in errors) {
                    var error = errors[key];
                    toast.error(error[0])
                }
            } else {
                toast.error('Something went wrong')
            }
        })
    }

    updateValue = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    buildInput = (type) => {
        if(type == undefined) {
            return (
                <Form.Group controlId={this.state.name}>
                    <Form.Label>{this.ucfirst(this.state.title)}</Form.Label>
                    <Form.Control type="text" label={this.state.title} defaultValue={this.state.value} onInput={this.updateValue} />
                </Form.Group>
            )
        } else if(type == 'select') {
            return (
                <Form.Group controlId={this.state.name} className="my-2">
                    <Form.Control as="select" defaultValue={this.state.value} onInput={this.updateValue}>
                        {this.state.options.map((e,i) => {
                            return (
                                <option key={i} value={e.value}>{e.name}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>
            )
        }
    }

    render() {
        var name = this.state.name;
        var value = this.state.value;
        var description = this.state.description;
        var title = this.state.title;
        var input = this.state.input;

        return (
            <Card className="m-2 setting-card">
                <Card.Body className="d-flex align-items-center">
                    <div>
                        <h4>{this.ucfirst(title)}</h4>
                        <div dangerouslySetInnerHTML={{ __html: description}} />
                        {this.buildInput(input)}
                        <Button variant="primary" onClick={this.update}>Save</Button>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

if (document.getElementById('Setting')) {
    ReactDOM.render(<Setting />, document.getElementById('Setting'));
}
