import React from 'react';

import '../../../styles/_global/ui/Form.scss';

class Form extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            name: '',
            email: '',
            description: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);

    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChangeName(e) {
        this.setState({ name: e.currentTarget.value });
    }

    onChangeEmail(e) {
        this.setState({ email: e.currentTarget.value });
    }

    onChangeDescription(e) {
        this.setState({ description: e.currentTarget.value });
    }

    get largeForm() {

        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <input
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder="Your full name" value={this.state.name}
                                onChange={this.onChangeName}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <input
                                name="email"
                                type="email"
                                className="form-control"
                                placeholder="Your email address"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                            />
                        </div>
                    </div>
                    <div className="col-xs-12">

                        <div className="form-group">
                    <textarea
                        className="form-control"
                        rows={this.props.rows}
                        placeholder="Description of your product idea in 280 characters"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                    />
                        </div>

                        <button type="submit" className="btn">Submit your idea</button>

                    </div>
                </div>

            </form>
        );

    }

    get smallForm() {

        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Your full name" value={this.state.name}
                        onChange={this.onChangeName}
                    />
                </div>
                <div className="form-group">
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Your email address"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                    />
                </div>

                <div className="form-group">
                    <textarea
                        className="form-control"
                        rows={this.props.rows}
                        placeholder="Description of your product idea in 280 characters"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                    />
                </div>

                <button type="submit" className="btn">Submit your idea</button>
            </form>
        );

    }

    render() {

        return (
            <div className="form clearfix">
                {this.props.large ? this.largeForm : this.smallForm}
            </div>
        );
    }

    static get defaultProps() {

        return {
            large: true,
            rows: 3
        };
    }
}

export default Form;