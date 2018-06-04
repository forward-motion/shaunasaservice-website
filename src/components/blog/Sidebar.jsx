import React from 'react';
import Link from 'gatsby-link';
import request from 'axios';

import Contact from '../_global/ui/Contact.jsx';

import '../../styles/blog/Sidebar.scss';

const STATE_INACTIVE = 0;
const STATE_SUBMITTING = 1;
const STATE_SUBMITTED = 2;

class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            submitState: STATE_INACTIVE
        };

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubscribe = this.onSubscribe.bind(this);
    }

    componentDidMount() {

        this.fbq = window.fbq || (() => console.log('fake fbq'));
    }


    onChangeEmail(e) {

        this.setState({
            email: e.currentTarget.value
        });
    }

    onSubscribe(e) {

        e.preventDefault();

        this.fbq('track', 'Lead');

        this.setState({
            submitState: STATE_SUBMITTING
        }, () => {

            const data = {
                email: this.state.email,
                api_key: process.env.GATSBY_CONVERTKIT_API_KEY
            };

            request.post(`https://api.convertkit.com/v3/forms/${process.env.GATSBY_CONVERTKIT_FORM_ID}/subscribe`, data)
                .then(res => {

                    this.setState({ submitState: STATE_SUBMITTED });
                });

        });
    }

    render() {

        let subscribeButton = 'Subscribe';
        switch (this.state.submitState) {
            case STATE_SUBMITTING:
                subscribeButton = 'Submitting...';
                break;
            case STATE_SUBMITTED:
                subscribeButton = 'Submitted!';
                break;
        }

        return (
            <div className={`sidebar${this.props.underFold ? ' under-fold' : ''}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-lg-offset-8 col-md-4 col-md-offset-8">

                            <div className="sidebar-content">

                                {this.props.children}


                                <form onSubmit={this.onSubscribe}>
                                    <div className="input-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter email to subscribe"
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
                                        />
                                        <span className="input-group-btn">
                                            <button
                                                type="submit"
                                                className="btn"
                                                disabled={this.state.submitState > STATE_INACTIVE}
                                            >
                                                {subscribeButton}
                                            </button>
                                        </span>
                                    </div>
                                </form>
                                <p>
                                    Got a product idea? <Link to="/"><span>Let's talk.</span></Link>
                                </p>
                                <Contact />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;