import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getCompetitionOfTheMonth } from '../../actions/index'
import ReactMarkdown from 'react-markdown';

class CurrentCompetition extends React.Component {
    constructor(props) {
        super(props);
    }

    competitionOfTheMonth() {
        fetch('/competition/current')
            .then(res => res.json())
            .then(data => this.props.dispatch(getCompetitionOfTheMonth(data)));
    }
    componentDidMount() {
        this.competitionOfTheMonth();
    }
    render() {

        let date = new Date();

        let currentComps = this.props.competition.map(value => {
            if ((new Date()) <= (new Date(value.deadline))){
                return <React.Fragment>
                    <div className="cardText col-xs-12">
                        <h2> {value.title}</h2>
                        <ReactMarkdown source={value.description} />
                        <ReactMarkdown source={value.rules} />
                        <p>{value.awards}</p>
                        <ReactMarkdown source={value.judges} />
                    </div>
                    <hr></hr>
                </React.Fragment>;
            }
            
        });

        return (
            <div>
                {currentComps}
            </div>
        );
    }

}

export default connect()(CurrentCompetition);