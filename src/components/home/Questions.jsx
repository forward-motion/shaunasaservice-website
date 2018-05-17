import React from 'react';

import '../../styles/home/Questions.scss';

const faqs = [
    {
        question: 'Who are you, and why should I trust you with my ideas?',
        answer: (
            <p>
                I'm a full-stack web developer whose worked on several web projects in and out of my 8+ years tenure working for fast-paced digital agencies and my own freelance clients.
                I've worked with individuals, startups, and large media conglomerates alike.
                I'm well-versed in PHP, node.js, and the wild west of front-end JavaScript. See the full list of technologies I work with here.
            </p>
        )
    },
    {
       question: 'Your process seems very low-touch. And only 280 characters? What gives?',
       answer: (
           <p>
               In order to keep the focus on rapid prototyping, our process is low-touch, which is perfect for validating ideas.
               There are no discovery sessions or rounds of revisions.
               Instead, you get inexpensive pure ideation realized as functional code with quick turnaround.
           </p>
       )
    },
    {
        question: 'What if I have feedback after the product is delivered?',
        answer: (
            <p>
                Bugs that cause the agreed upon QA criteria to fail are fixed for free.
                Bugs that are outside the scope of the QA criteria are handled by a change work order.
                Visual feedback or new features are also handled by a change work order.
                Change work orders allow the scope of the project to change, thus usually increasing any combination of price, timeline, and features and functionality.
            </p>
        )
    },
    {
        question: 'My MVP is built and I want to turn it into a V1 product. Can you help?',
        answer: (
            <p>
                I don't generally offer high-touch development services, but feel free to send me an email about it.
                If I can't help, I will send you a list of other developers or agencies that can help you out.
            </p>
        )
    }

];

class Faq extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    render() {

        const { question, answer } = this.props;
        const className = `faq ${this.state.expanded ? 'expanded' : 'collapsed'}`;

        return (
            <div className="col-xs-12">
                <div className={className}>
                    <h3 onClick={this.onClick}>
                        <span className="glyphicon glyphicon-record" aria-hidden="true" />
                        {question}
                    </h3>
                    <div className="answer">
                        {answer}
                    </div>
                </div>
            </div>
        );
    }
}

const Questions = (props) => (
    <div className="questions">
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <h2 className="large-text">
                        FAQs
                    </h2>
                </div>
            </div>
            {faqs.map(({ question, answer }, index) => (

                <div className="row" key={index}>
                    <Faq question={question} answer={answer} />
                </div>
            ))}
        </div>
    </div>
);

export default Questions;