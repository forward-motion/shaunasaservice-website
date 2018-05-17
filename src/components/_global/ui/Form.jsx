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

    render() {

        return (
            <form className="form" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Your name" value={this.state.name}
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
                        rows="5"
                        placeholder="Describe your product idea in 500 words"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                    />
                </div>

                <button type="submit" className="btn">Submit your idea</button>
            </form>
        );
    }

}

export default Form;