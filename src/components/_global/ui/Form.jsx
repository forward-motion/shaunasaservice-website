import React from 'react';
import request from 'axios';
import qs  from 'qs';
import thanks from '../../../assets/img/thanks.svg';

import '../../../styles/_global/ui/Form.scss';

const STATE_INACTIVE = 0;
const STATE_SUBMITTING = 1;
const STATE_SUBMITTED = 2;

class Form extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            name: '',
            email: '',
            description: '',
            errors: {
                name: false,
                email: false,
                description: false
            },
            shouldValidate: false,
            submitState: STATE_INACTIVE
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
    }

    componentDidMount() {

        this.fbq = window.fbq || (() => console.log('fake fbq'));
    }

    onSubmit(e) {

        e.preventDefault();

        this.validate((isValid) => {

            if (isValid) {

                this.setState({
                    submitState: STATE_SUBMITTING
                }, () => {

                    const data = {
                        name: this.state.name,
                        email: this.state.email,
                        description: this.state.description,
                        ['form-name']: this.props.formName
                    };

                    request.post('/', qs.stringify(data))
                        .then(res => {
                            this.setState({ submitState: STATE_SUBMITTED }, () => {

                                this.fbq('track', 'CompleteRegistration');
                            });
                        });
                });
            }
        });
    }

    onChangeName(e) {
        this.setState({ name: e.currentTarget.value });
    }

    onChangeEmail(e) {
        this.setState({ email: e.currentTarget.value });
    }

    onChangeDescription(e) {
        this.setState({ description: e.currentTarget.value.substring(0, 280) });
    }

    validate(callback) {

        const indexOfAt = this.state.email.indexOf('@');

        const errors = {
            name: this.state.name.length === 0,
            email: indexOfAt <= 0 || indexOfAt === this.state.email.length - 1,
            description: this.state.description.length === 0
        };

        this.setState({ errors, shouldValidate: true }, () => {

            const invalid = Object.keys(errors).find(field => errors[field]);
            callback(!invalid);
        });
    }

    get nameField() {

        return (
            <div className={`form-group${this.state.errors.name ? ' has-error' : ''}`}>
                <input
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Your full name" value={this.state.name}
                    onChange={this.onChangeName}
                />
            </div>
        );
    }

    get emailField() {

        return (
            <div className={`form-group${this.state.errors.email ? ' has-error' : ''}`}>
                <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Your email address"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                />
            </div>
        );
    }

    get descriptionField() {

        return (
            <div className={`form-group${this.state.errors.description ? ' has-error' : ''}`}>
                <textarea
                    name="description"
                    className="form-control"
                    rows={this.props.rows}
                    placeholder="Description of your digital product idea in 280 characters"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                />
            </div>
        );
    }

    get thanks() {

        return (
            <div className="thanks">
                <h3>
                    Thanks for submitting!
                </h3>
                <img src={thanks} />
                <h4>
                    I'll get back to you in 24-48 hours.
                </h4>
            </div>
        );
    }

    get largeForm() {

        return (
            <div className="row">
                <div className="col-lg-6">
                    {this.nameField}
                </div>
                <div className="col-lg-6">
                    {this.emailField}
                </div>
                <div className="col-xs-12">
                    {this.descriptionField}
                    <button
                        type="submit"
                        className="btn"
                        disabled={this.state.submitState > STATE_INACTIVE}
                    >
                        Submit your idea
                    </button>
                </div>
            </div>
        );
    }

    get smallForm() {

        return (
            <div>
                {this.nameField}
                {this.emailField}
                {this.descriptionField}
                <button
                    type="submit"
                    className="btn"
                    disabled={this.state.submitState > STATE_INACTIVE}
                >
                    Submit your idea
                </button>
            </div>
        );

    }

    render() {

        return (
            <div className={`form clearfix${this.state.submitState === STATE_SUBMITTED ? ' submitted' : ''}`}>
                {this.thanks}
                <form
                    name={this.props.formName}
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    method="POST"
                    onSubmit={this.onSubmit}
                >
                    <input className="hidden" name="bot-field" defaultValue="" />
                    {this.props.large ? this.largeForm : this.smallForm}
                </form>

            </div>
        );
    }

    static get defaultProps() {

        return {
            large: true,
            rows: 3,
            formName: 'applications'
        };
    }
}

export default Form;