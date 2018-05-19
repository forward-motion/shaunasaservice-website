import React from 'react';

import '../../styles/home/Questions.scss';

const faqs = [
    {
        question: 'Who are you, and why should I trust you with my ideas?',
        answer: (
            <div>
                <p>
                    I'm a full-stack web developer with countless web projects under my belt. For 8+ years I've worked for fast-paced digital agencies and my own freelance clients.
                </p>
                <p>
                    My clients have included individuals, startups, and large media conglomerates alike.
                </p>
                <p>
                    I'm well-versed in several back-end and front-end technologies, of which there are too many to list in this space. Node.js and React are my favorites at the moment.
                </p>
            </div>
        )
    },
    {
       question: 'Your process seems very low-touch. And only 280 characters? What gives?',
       answer: (
           <div>
               <p>
                   In order to keep the focus on rapid prototyping, the process is low-touch, which is perfect for quickly validating ideas.
               </p>
               <p>
                   There are no discovery sessions or several rounds of revisions. Instead, you get inexpensive pure ideation realized as functional code with quick turnaround.
               </p>
               <p>
                   280 characters was chosen because it's Twitter's character limit. If you can't describe your MVP (minimum viable product) in a tweet, then chances are you're not actually describing an MVP.
               </p>
           </div>
       )
    },
    {
        question: 'How is feedback handled?',
        answer: (
            <div>
                <p>
                    Feedback is generally only accepted after development is complete and before your invoice is sent.
                </p>
                <p>
                    Bugs that cause the agreed upon QA criteria to fail are fixed for free. Minor visual changes are also done for free (at my discretion).
                </p>
                <p>
                    Bugs that are outside the scope of the QA criteria are handled by additional line items to your invoice.
                    Major visual feedback or new features also add line items to your invoice.
                </p>
            </div>
        )
    },
    {
        question: `What if I want a fully-designed and developed product instead of a prototype?`,
        answer: (
            <div>
                <p>
                    I don't generally offer high-touch development services, but feel free to send me an email about it.
                </p>
                <p>
                    If I can't help, I will send you a list of other developers or agencies that can help you out.
                </p>
            </div>
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
        const icon = this.state.expanded ? 'minus' : 'plus';

        return (
            <div className="col-xs-12">

                <div className="panel panel-default">
                    <div className="panel-body">

                        <div className={className}>
                            <h3 onClick={this.onClick}>
                                <span className={`glyphicon glyphicon-${icon}`} aria-hidden="true" />
                                {question}
                            </h3>
                            <div className="answer">
                                {answer}
                            </div>
                        </div>

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